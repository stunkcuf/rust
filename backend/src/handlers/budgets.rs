use axum::{extract::{Path, Query, State}, http::StatusCode, Json};
use serde::Deserialize;
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::models::{Budget, CreateBudget};

#[derive(Deserialize)]
pub struct BudgetQuery {
    location_id: Option<i64>,
}

pub async fn create_budget(State(pool): State<Arc<SqlitePool>>, Json(payload): Json<CreateBudget>) -> Result<Json<Budget>, (StatusCode, String)> {
    let result = sqlx::query("INSERT INTO budgets (location_id, name, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)")
        .bind(payload.location_id).bind(&payload.name).bind(payload.amount).bind(payload.start_date).bind(payload.end_date)
        .execute(pool.as_ref()).await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let budget: Budget = sqlx::query_as("SELECT * FROM budgets WHERE id = ?").bind(result.last_insert_rowid())
        .fetch_one(pool.as_ref()).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(budget))
}

pub async fn list_budgets(State(pool): State<Arc<SqlitePool>>, Query(params): Query<BudgetQuery>) -> Result<Json<Vec<Budget>>, (StatusCode, String)> {
    let budgets = if let Some(location_id) = params.location_id {
        sqlx::query_as("SELECT * FROM budgets WHERE location_id = ? ORDER BY start_date DESC").bind(location_id).fetch_all(pool.as_ref()).await
    } else {
        sqlx::query_as("SELECT * FROM budgets ORDER BY start_date DESC").fetch_all(pool.as_ref()).await
    }.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(Json(budgets))
}

pub async fn get_budget(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>) -> Result<Json<Budget>, (StatusCode, String)> {
    let budget = sqlx::query_as("SELECT * FROM budgets WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Budget not found".to_string()))?;
    Ok(Json(budget))
}

pub async fn update_budget(State(pool): State<Arc<SqlitePool>>, Path(id): Path<i64>, Json(payload): Json<CreateBudget>) -> Result<Json<Budget>, (StatusCode, String)> {
    sqlx::query("UPDATE budgets SET location_id = ?, name = ?, amount = ?, start_date = ?, end_date = ? WHERE id = ?")
        .bind(payload.location_id).bind(&payload.name).bind(payload.amount).bind(payload.start_date).bind(payload.end_date).bind(id)
        .execute(pool.as_ref()).await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let budget = sqlx::query_as("SELECT * FROM budgets WHERE id = ?").bind(id).fetch_one(pool.as_ref()).await
        .map_err(|_| (StatusCode::NOT_FOUND, "Budget not found".to_string()))?;
    Ok(Json(budget))
}
