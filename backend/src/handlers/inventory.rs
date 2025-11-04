use axum::{extract::{Path, Query, State}, http::StatusCode, Json};
use serde::Deserialize;
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::models::{Inventory, InventoryWithDetails, UpdateInventory};

#[derive(Deserialize)]
pub struct InventoryQuery {
    location_id: Option<i64>,
    item_id: Option<i64>,
}

pub async fn list_inventory(State(pool): State<Arc<SqlitePool>>, Query(params): Query<InventoryQuery>) -> Result<Json<Vec<InventoryWithDetails>>, (StatusCode, String)> {
    let mut query = "SELECT i.id, i.item_id, it.name as item_name, it.sku, i.location_id, l.name as location_name, i.quantity, it.reorder_level, it.overstock_level, it.unit_price, i.last_updated FROM inventory i JOIN items it ON i.item_id = it.id JOIN locations l ON i.location_id = l.id WHERE 1=1".to_string();
    if params.location_id.is_some() { query.push_str(" AND i.location_id = ?"); }
    if params.item_id.is_some() { query.push_str(" AND i.item_id = ?"); }
    query.push_str(" ORDER BY it.name");
    let mut sql_query = sqlx::query_as(&query);
    if let Some(loc_id) = params.location_id { sql_query = sql_query.bind(loc_id); }
    if let Some(item_id) = params.item_id { sql_query = sql_query.bind(item_id); }
    let inventory = sql_query.fetch_all(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(inventory))
}

pub async fn get_inventory(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<InventoryWithDetails>, (StatusCode, String)> {
    let inventory = sqlx::query_as("SELECT i.id, i.item_id, it.name as item_name, it.sku, i.location_id, l.name as location_name, i.quantity, it.reorder_level, it.overstock_level, it.unit_price, i.last_updated FROM inventory i JOIN items it ON i.item_id = it.id JOIN locations l ON i.location_id = l.id WHERE i.id = ?")
        .bind(id).fetch_one(pool.as_ref()).await.map_err(|_| (StatusCode::NOT_FOUND, "Inventory record not found".to_string()))?;
    Ok(Json(inventory))
}

pub async fn update_inventory(State(pool): State<Arc<SqlitePool>>, Json(payload): Json<UpdateInventory>) -> Result<Json<Inventory>, (StatusCode, String)> {
    let existing: Option<Inventory> = sqlx::query_as("SELECT * FROM inventory WHERE item_id = ? AND location_id = ?")
        .bind(payload.item_id).bind(payload.location_id).fetch_optional(pool.as_ref()).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    if existing.is_some() {
        sqlx::query("UPDATE inventory SET quantity = ?, last_updated = CURRENT_TIMESTAMP WHERE item_id = ? AND location_id = ?")
            .bind(payload.quantity).bind(payload.item_id).bind(payload.location_id).execute(pool.as_ref()).await
            .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    } else {
        sqlx::query("INSERT INTO inventory (item_id, location_id, quantity) VALUES (?, ?, ?)")
            .bind(payload.item_id).bind(payload.location_id).bind(payload.quantity).execute(pool.as_ref()).await
            .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    }
    let updated: Inventory = sqlx::query_as("SELECT * FROM inventory WHERE item_id = ? AND location_id = ?")
        .bind(payload.item_id).bind(payload.location_id).fetch_one(pool.as_ref()).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(updated))
}

pub async fn get_low_stock(State(pool): State<Arc<SqlitePool>>) -> Result<Json<Vec<InventoryWithDetails>>, (StatusCode, String)> {
    let inventory = sqlx::query_as("SELECT i.id, i.item_id, it.name as item_name, it.sku, i.location_id, l.name as location_name, i.quantity, it.reorder_level, it.overstock_level, it.unit_price, i.last_updated FROM inventory i JOIN items it ON i.item_id = it.id JOIN locations l ON i.location_id = l.id WHERE i.quantity <= it.reorder_level ORDER BY i.quantity ASC")
        .fetch_all(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(inventory))
}

pub async fn get_overstock(State(pool): State<Arc<SqlitePool>>) -> Result<Json<Vec<InventoryWithDetails>>, (StatusCode, String)> {
    let inventory = sqlx::query_as("SELECT i.id, i.item_id, it.name as item_name, it.sku, i.location_id, l.name as location_name, i.quantity, it.reorder_level, it.overstock_level, it.unit_price, i.last_updated FROM inventory i JOIN items it ON i.item_id = it.id JOIN locations l ON i.location_id = l.id WHERE i.quantity >= it.overstock_level ORDER BY i.quantity DESC")
        .fetch_all(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(inventory))
}
