use axum::{extract::{Path, Query, Request, State}, http::StatusCode, Json};
use serde::Deserialize;
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::auth::Claims;
use crate::models::{CreatePurchase, Purchase, PurchaseWithDetails, UpdatePurchaseStatus};

#[derive(Deserialize)]
pub struct PurchaseQuery {
    location_id: Option<i64>,
    status: Option<String>,
}

pub async fn create_purchase(State(pool): State<Arc<SqlitePool>>, request: Request, Json(payload): Json<CreatePurchase>) -> Result<Json<Purchase>, (StatusCode, String)> {
    let claims = request.extensions().get::<Claims>().ok_or((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))?;
    let user_id: i64 = claims.sub.parse().map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Invalid user ID".to_string()))?;
    let total_price = payload.quantity as f64 * payload.unit_price;
    let result = sqlx::query("INSERT INTO purchases (item_id, location_id, budget_id, quantity, unit_price, total_price, vendor, ordered_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(payload.item_id).bind(payload.location_id).bind(payload.budget_id).bind(payload.quantity)
        .bind(payload.unit_price).bind(total_price).bind(&payload.vendor).bind(user_id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    if let Some(budget_id) = payload.budget_id {
        sqlx::query("UPDATE budgets SET spent = spent + ? WHERE id = ?").bind(total_price).bind(budget_id)
            .execute(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    }
    let purchase: Purchase = sqlx::query_as("SELECT * FROM purchases WHERE id = ?").bind(result.last_insert_rowid())
        .fetch_one(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(purchase))
}

pub async fn list_purchases(State(pool): State<Arc<SqlitePool>>, Query(params): Query<PurchaseQuery>) -> Result<Json<Vec<PurchaseWithDetails>>, (StatusCode, String)> {
    let mut query = "SELECT p.id, p.item_id, i.name as item_name, i.sku, p.location_id, l.name as location_name, p.budget_id, b.name as budget_name, p.quantity, p.unit_price, p.total_price, p.vendor, p.status, p.ordered_by, u.username as ordered_by_username, p.ordered_at FROM purchases p JOIN items i ON p.item_id = i.id JOIN locations l ON p.location_id = l.id LEFT JOIN budgets b ON p.budget_id = b.id JOIN users u ON p.ordered_by = u.id WHERE 1=1".to_string();
    if params.location_id.is_some() { query.push_str(" AND p.location_id = ?"); }
    if params.status.is_some() { query.push_str(" AND p.status = ?"); }
    query.push_str(" ORDER BY p.ordered_at DESC");
    let mut sql_query = sqlx::query_as(&query);
    if let Some(loc_id) = params.location_id { sql_query = sql_query.bind(loc_id); }
    if let Some(ref status) = params.status { sql_query = sql_query.bind(status); }
    let purchases = sql_query.fetch_all(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(purchases))
}

pub async fn get_purchase(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<PurchaseWithDetails>, (StatusCode, String)> {
    let purchase = sqlx::query_as("SELECT p.id, p.item_id, i.name as item_name, i.sku, p.location_id, l.name as location_name, p.budget_id, b.name as budget_name, p.quantity, p.unit_price, p.total_price, p.vendor, p.status, p.ordered_by, u.username as ordered_by_username, p.ordered_at FROM purchases p JOIN items i ON p.item_id = i.id JOIN locations l ON p.location_id = l.id LEFT JOIN budgets b ON p.budget_id = b.id JOIN users u ON p.ordered_by = u.id WHERE p.id = ?")
        .bind(id).fetch_one(pool.as_ref()).await.map_err(|_| (StatusCode::NOT_FOUND, "Purchase not found".to_string()))?;
    Ok(Json(purchase))
}

pub async fn update_purchase_status(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>, Json(payload): Json<UpdatePurchaseStatus>) -> Result<Json<Purchase>, (StatusCode, String)> {
    if payload.status == "completed" {
        let purchase: Purchase = sqlx::query_as("SELECT * FROM purchases WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
            .map_err(|_| (StatusCode::NOT_FOUND, "Purchase not found".to_string()))?;
        let existing: Option<(i32,)> = sqlx::query_as("SELECT quantity FROM inventory WHERE item_id = ? AND location_id = ?")
            .bind(purchase.item_id).bind(purchase.location_id).fetch_optional(pool.as_ref()).await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        if let Some((current_qty,)) = existing {
            sqlx::query("UPDATE inventory SET quantity = ?, last_updated = CURRENT_TIMESTAMP WHERE item_id = ? AND location_id = ?")
                .bind(current_qty + purchase.quantity).bind(purchase.item_id).bind(purchase.location_id).execute(pool.as_ref()).await
                .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        } else {
            sqlx::query("INSERT INTO inventory (item_id, location_id, quantity) VALUES (?, ?, ?)")
                .bind(purchase.item_id).bind(purchase.location_id).bind(purchase.quantity).execute(pool.as_ref()).await
                .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        }
    }
    sqlx::query("UPDATE purchases SET status = ? WHERE id = ?").bind(&payload.status).bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let purchase = sqlx::query_as("SELECT * FROM purchases WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Purchase not found".to_string()))?;
    Ok(Json(purchase))
}
