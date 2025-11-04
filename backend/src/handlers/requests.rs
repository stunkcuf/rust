use axum::{extract::{Path, Query, Request, State}, http::StatusCode, Json};
use serde::Deserialize;
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::auth::Claims;
use crate::models::{CreateItemRequest, ItemRequest, ItemRequestWithDetails, UpdateItemRequestStatus};

#[derive(Deserialize)]
pub struct RequestQuery {
    location_id: Option<i64>,
    status: Option<String>,
}

pub async fn create_request(State(pool): State<Arc<SqlitePool>>, request: Request, Json(payload): Json<CreateItemRequest>) -> Result<Json<ItemRequest>, (StatusCode, String)> {
    let claims = request.extensions().get::<Claims>().ok_or((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))?;
    let user_id: i64 = claims.sub.parse().map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Invalid user ID".to_string()))?;
    let result = sqlx::query("INSERT INTO item_requests (item_id, location_id, quantity, reason, priority, requested_by) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(payload.item_id).bind(payload.location_id).bind(payload.quantity).bind(&payload.reason)
        .bind(&payload.priority).bind(user_id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let item_request: ItemRequest = sqlx::query_as("SELECT * FROM item_requests WHERE id = ?").bind(result.last_insert_rowid())
        .fetch_one(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(item_request))
}

pub async fn list_requests(State(pool): State<Arc<SqlitePool>>, Query(params): Query<RequestQuery>) -> Result<Json<Vec<ItemRequestWithDetails>>, (StatusCode, String)> {
    let mut query = "SELECT r.id, r.item_id, i.name as item_name, i.sku, r.location_id, l.name as location_name, r.quantity, r.reason, r.priority, r.status, r.requested_by, u1.username as requested_by_username, r.requested_at, r.reviewed_by, u2.username as reviewed_by_username, r.reviewed_at FROM item_requests r JOIN items i ON r.item_id = i.id JOIN locations l ON r.location_id = l.id JOIN users u1 ON r.requested_by = u1.id LEFT JOIN users u2 ON r.reviewed_by = u2.id WHERE 1=1".to_string();
    if params.location_id.is_some() { query.push_str(" AND r.location_id = ?"); }
    if params.status.is_some() { query.push_str(" AND r.status = ?"); }
    query.push_str(" ORDER BY r.requested_at DESC");
    let mut sql_query = sqlx::query_as(&query);
    if let Some(loc_id) = params.location_id { sql_query = sql_query.bind(loc_id); }
    if let Some(ref status) = params.status { sql_query = sql_query.bind(status); }
    let requests = sql_query.fetch_all(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(requests))
}

pub async fn get_request(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<ItemRequestWithDetails>, (StatusCode, String)> {
    let item_request = sqlx::query_as("SELECT r.id, r.item_id, i.name as item_name, i.sku, r.location_id, l.name as location_name, r.quantity, r.reason, r.priority, r.status, r.requested_by, u1.username as requested_by_username, r.requested_at, r.reviewed_by, u2.username as reviewed_by_username, r.reviewed_at FROM item_requests r JOIN items i ON r.item_id = i.id JOIN locations l ON r.location_id = l.id JOIN users u1 ON r.requested_by = u1.id LEFT JOIN users u2 ON r.reviewed_by = u2.id WHERE r.id = ?")
        .bind(id).fetch_one(pool.as_ref()).await.map_err(|_| (StatusCode::NOT_FOUND, "Request not found".to_string()))?;
    Ok(Json(item_request))
}

pub async fn update_request_status(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>, request: Request, Json(payload): Json<UpdateItemRequestStatus>) -> Result<Json<ItemRequest>, (StatusCode, String)> {
    let claims = request.extensions().get::<Claims>().ok_or((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))?;
    let user_id: i64 = claims.sub.parse().map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Invalid user ID".to_string()))?;
    sqlx::query("UPDATE item_requests SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?")
        .bind(&payload.status).bind(user_id).bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let item_request = sqlx::query_as("SELECT * FROM item_requests WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Request not found".to_string()))?;
    Ok(Json(item_request))
}
