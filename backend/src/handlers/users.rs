use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use sqlx::SqlitePool;
use std::sync::Arc;

use crate::auth::{hash_password, verify_password, AuthState};
use crate::models::{AuthResponse, CreateUser, LoginRequest, User, UserInfo};

pub async fn register(
    State(pool): State<Arc<SqlitePool>>,
    State(auth_state): State<Arc<AuthState>>,
    Json(payload): Json<CreateUser>,
) -> Result<Json<AuthResponse>, (StatusCode, String)> {
    // Hash password
    let password_hash = hash_password(&payload.password)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Insert user
    let result = sqlx::query(
        "INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)"
    )
    .bind(&payload.username)
    .bind(&password_hash)
    .bind(&payload.email)
    .bind(&payload.role)
    .execute(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::BAD_REQUEST, format!("Failed to create user: {}", e)))?;

    let user_id = result.last_insert_rowid();

    // Generate token
    let token = auth_state
        .generate_token(user_id, &payload.username, &payload.role)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(AuthResponse {
        token,
        user: UserInfo {
            id: user_id,
            username: payload.username,
            email: payload.email,
            role: payload.role,
        },
    }))
}

pub async fn login(
    State(pool): State<Arc<SqlitePool>>,
    State(auth_state): State<Arc<AuthState>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, String)> {
    // Get user by username
    let user: User = sqlx::query_as("SELECT * FROM users WHERE username = ?")
        .bind(&payload.username)
        .fetch_one(pool.as_ref())
        .await
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid credentials".to_string()))?;

    // Verify password
    let valid = verify_password(&payload.password, &user.password_hash)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if !valid {
        return Err((StatusCode::UNAUTHORIZED, "Invalid credentials".to_string()));
    }

    // Generate token
    let token = auth_state
        .generate_token(user.id, &user.username, &user.role)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(AuthResponse {
        token,
        user: UserInfo {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    }))
}

pub async fn list_users(
    State(pool): State<Arc<SqlitePool>>,
) -> Result<Json<Vec<UserInfo>>, (StatusCode, String)> {
    let users: Vec<User> = sqlx::query_as("SELECT * FROM users ORDER BY username")
        .fetch_all(pool.as_ref())
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let user_infos: Vec<UserInfo> = users
        .into_iter()
        .map(|u| UserInfo {
            id: u.id,
            username: u.username,
            email: u.email,
            role: u.role,
        })
        .collect();

    Ok(Json(user_infos))
}

pub async fn get_user(
    State(pool): State<Arc<SqlitePool>>,
    Path(id): Path<i64>,
) -> Result<Json<UserInfo>, (StatusCode, String)> {
    let user: User = sqlx::query_as("SELECT * FROM users WHERE id = ?")
        .bind(id)
        .fetch_one(pool.as_ref())
        .await
        .map_err(|_| (StatusCode::NOT_FOUND, "User not found".to_string()))?;

    Ok(Json(UserInfo {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }))
}
