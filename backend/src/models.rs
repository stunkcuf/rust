use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i64, pub username: String,
    #[serde(skip_serializing)] pub password_hash: String,
    pub email: String, pub role: String, pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateUser { pub username: String, pub password: String, pub email: String, pub role: String }

#[derive(Debug, Deserialize)]
pub struct LoginRequest { pub username: String, pub password: String }

#[derive(Debug, Serialize)]
pub struct AuthResponse { pub token: String, pub user: UserInfo }

#[derive(Debug, Serialize)]
pub struct UserInfo { pub id: i64, pub username: String, pub email: String, pub role: String }

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Location {
    pub id: i64, pub name: String, pub address: String,
    pub manager_id: Option<i64>, pub created_at: DateTime<Utc>
}

#[derive(Debug, Deserialize)]
pub struct CreateLocation { pub name: String, pub address: String, pub manager_id: Option<i64> }

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Item {
    pub id: i64, pub name: String, pub description: Option<String>, pub sku: String,
    pub category: String, pub unit_price: f64, pub reorder_level: i32,
    pub overstock_level: i32, pub created_at: DateTime<Utc>
}

#[derive(Debug, Deserialize)]
pub struct CreateItem {
    pub name: String, pub description: Option<String>, pub sku: String, pub category: String,
    pub unit_price: f64, pub reorder_level: i32, pub overstock_level: i32
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Inventory {
    pub id: i64, pub item_id: i64, pub location_id: i64,
    pub quantity: i32, pub last_updated: DateTime<Utc>
}

#[derive(Debug, Serialize, FromRow)]
pub struct InventoryWithDetails {
    pub id: i64, pub item_id: i64, pub item_name: String, pub sku: String,
    pub location_id: i64, pub location_name: String, pub quantity: i32,
    pub reorder_level: i32, pub overstock_level: i32, pub unit_price: f64,
    pub last_updated: DateTime<Utc>
}

#[derive(Debug, Deserialize)]
pub struct UpdateInventory { pub item_id: i64, pub location_id: i64, pub quantity: i32 }

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Budget {
    pub id: i64, pub location_id: i64, pub name: String, pub amount: f64, pub spent: f64,
    pub start_date: DateTime<Utc>, pub end_date: DateTime<Utc>, pub created_at: DateTime<Utc>
}

#[derive(Debug, Deserialize)]
pub struct CreateBudget {
    pub location_id: i64, pub name: String, pub amount: f64,
    pub start_date: DateTime<Utc>, pub end_date: DateTime<Utc>
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Purchase {
    pub id: i64, pub item_id: i64, pub location_id: i64, pub budget_id: Option<i64>,
    pub quantity: i32, pub unit_price: f64, pub total_price: f64, pub vendor: String,
    pub status: String, pub ordered_by: i64, pub ordered_at: DateTime<Utc>
}

#[derive(Debug, Serialize, FromRow)]
pub struct PurchaseWithDetails {
    pub id: i64, pub item_id: i64, pub item_name: String, pub sku: String,
    pub location_id: i64, pub location_name: String, pub budget_id: Option<i64>,
    pub budget_name: Option<String>, pub quantity: i32, pub unit_price: f64,
    pub total_price: f64, pub vendor: String, pub status: String, pub ordered_by: i64,
    pub ordered_by_username: String, pub ordered_at: DateTime<Utc>
}

#[derive(Debug, Deserialize)]
pub struct CreatePurchase {
    pub item_id: i64, pub location_id: i64, pub budget_id: Option<i64>,
    pub quantity: i32, pub unit_price: f64, pub vendor: String
}

#[derive(Debug, Deserialize)]
pub struct UpdatePurchaseStatus { pub status: String }

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ItemRequest {
    pub id: i64, pub item_id: i64, pub location_id: i64, pub quantity: i32,
    pub reason: String, pub priority: String, pub status: String, pub requested_by: i64,
    pub requested_at: DateTime<Utc>, pub reviewed_by: Option<i64>, pub reviewed_at: Option<DateTime<Utc>>
}

#[derive(Debug, Serialize, FromRow)]
pub struct ItemRequestWithDetails {
    pub id: i64, pub item_id: i64, pub item_name: String, pub sku: String,
    pub location_id: i64, pub location_name: String, pub quantity: i32, pub reason: String,
    pub priority: String, pub status: String, pub requested_by: i64, pub requested_by_username: String,
    pub requested_at: DateTime<Utc>, pub reviewed_by: Option<i64>, pub reviewed_by_username: Option<String>,
    pub reviewed_at: Option<DateTime<Utc>>
}

#[derive(Debug, Deserialize)]
pub struct CreateItemRequest {
    pub item_id: i64, pub location_id: i64, pub quantity: i64, pub reason: String, pub priority: String
}

#[derive(Debug, Deserialize)]
pub struct UpdateItemRequestStatus { pub status: String }
