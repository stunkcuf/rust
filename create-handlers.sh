#!/bin/bash
cd /home/user/umchs-inventory/backend/src/handlers

# Locations handler
cat > locations.rs << 'EOF'
use axum::{extract::{Path, State}, http::StatusCode, Json};
use sqlx::SqlitePool; use std::sync::Arc;
use crate::models::{CreateLocation, Location};

pub async fn create_location(State(pool): State<Arc<SqlitePool>>, Json(payload): Json<CreateLocation>) -> Result<Json<Location>, (StatusCode, String)> {
    let result = sqlx::query("INSERT INTO locations (name, address, manager_id) VALUES (?, ?, ?)")
        .bind(&payload.name).bind(&payload.address).bind(payload.manager_id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let location: Location = sqlx::query_as("SELECT * FROM locations WHERE id = ?").bind(result.last_insert_rowid())
        .fetch_one(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(location))
}

pub async fn list_locations(State(pool): State<Arc<SqlitePool>>) -> Result<Json<Vec<Location>>, (StatusCode, String)> {
    let locations = sqlx::query_as("SELECT * FROM locations ORDER BY name").fetch_all(pool.as_ref()).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(locations))
}

pub async fn get_location(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<Location>, (StatusCode, String)> {
    let location = sqlx::query_as("SELECT * FROM locations WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Location not found".to_string()))?;
    Ok(Json(location))
}

pub async fn update_location(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>, Json(payload): Json<CreateLocation>) -> Result<Json<Location>, (StatusCode, String)> {
    sqlx::query("UPDATE locations SET name = ?, address = ?, manager_id = ? WHERE id = ?")
        .bind(&payload.name).bind(&payload.address).bind(payload.manager_id).bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let location = sqlx::query_as("SELECT * FROM locations WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Location not found".to_string()))?;
    Ok(Json(location))
}

pub async fn delete_location(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<StatusCode, (StatusCode, String)> {
    sqlx::query("DELETE FROM locations WHERE id = ?").bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    Ok(StatusCode::NO_CONTENT)
}
EOF

# Items handler
cat > items.rs << 'EOF'
use axum::{extract::{Path, State}, http::StatusCode, Json};
use sqlx::SqlitePool; use std::sync::Arc;
use crate::models::{CreateItem, Item};

pub async fn create_item(State(pool): State<Arc<SqlitePool>>, Json(payload): Json<CreateItem>) -> Result<Json<Item>, (StatusCode, String)> {
    let result = sqlx::query("INSERT INTO items (name, description, sku, category, unit_price, reorder_level, overstock_level) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(&payload.name).bind(&payload.description).bind(&payload.sku).bind(&payload.category)
        .bind(payload.unit_price).bind(payload.reorder_level).bind(payload.overstock_level).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let item: Item = sqlx::query_as("SELECT * FROM items WHERE id = ?").bind(result.last_insert_rowid())
        .fetch_one(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(item))
}

pub async fn list_items(State(pool): State<Arc<SqlitePool>>) -> Result<Json<Vec<Item>>, (StatusCode, String)> {
    let items = sqlx::query_as("SELECT * FROM items ORDER BY name").fetch_all(pool.as_ref()).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(items))
}

pub async fn get_item(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<Item>, (StatusCode, String)> {
    let item = sqlx::query_as("SELECT * FROM items WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Item not found".to_string()))?;
    Ok(Json(item))
}

pub async fn update_item(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>, Json(payload): Json<CreateItem>) -> Result<Json<Item>, (StatusCode, String)> {
    sqlx::query("UPDATE items SET name = ?, description = ?, sku = ?, category = ?, unit_price = ?, reorder_level = ?, overstock_level = ? WHERE id = ?")
        .bind(&payload.name).bind(&payload.description).bind(&payload.sku).bind(&payload.category)
        .bind(payload.unit_price).bind(payload.reorder_level).bind(payload.overstock_level).bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let item = sqlx::query_as("SELECT * FROM items WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Item not found".to_string()))?;
    Ok(Json(item))
}

pub async fn delete_item(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<StatusCode, (StatusCode, String)> {
    sqlx::query("DELETE FROM items WHERE id = ?").bind(id).execute(pool.as_ref()).await
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    Ok(StatusCode::NO_CONTENT)
}
EOF

echo "✅ Created locations and items handlers"
