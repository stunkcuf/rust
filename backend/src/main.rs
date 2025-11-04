mod auth;
mod db;
mod handlers;
mod models;

use axum::{
    middleware,
    routing::{delete, get, patch, post, put},
    Router,
};
use std::sync::Arc;
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load environment variables
    dotenvy::dotenv().ok();

    // Database setup
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:inventory.db".to_string());

    let pool = db::create_pool(&database_url).await?;
    db::run_migrations(&pool).await?;

    let pool = Arc::new(pool);

    // Auth state
    let jwt_secret = std::env::var("JWT_SECRET")
        .unwrap_or_else(|_| "your-secret-key-change-in-production".to_string());
    let auth_state = Arc::new(auth::AuthState::new(jwt_secret));

    // Build router
    let app = Router::new()
        // Public routes
        .route("/api/auth/register", post(handlers::users::register))
        .route("/api/auth/login", post(handlers::users::login))

        // Protected routes
        .route("/api/users", get(handlers::users::list_users))
        .route("/api/users/:id", get(handlers::users::get_user))

        .route("/api/locations", get(handlers::locations::list_locations))
        .route("/api/locations", post(handlers::locations::create_location))
        .route("/api/locations/:id", get(handlers::locations::get_location))
        .route("/api/locations/:id", put(handlers::locations::update_location))
        .route("/api/locations/:id", delete(handlers::locations::delete_location))

        .route("/api/items", get(handlers::items::list_items))
        .route("/api/items", post(handlers::items::create_item))
        .route("/api/items/:id", get(handlers::items::get_item))
        .route("/api/items/:id", put(handlers::items::update_item))
        .route("/api/items/:id", delete(handlers::items::delete_item))

        .route("/api/inventory", get(handlers::inventory::list_inventory))
        .route("/api/inventory/:id", get(handlers::inventory::get_inventory))
        .route("/api/inventory", put(handlers::inventory::update_inventory))
        .route("/api/inventory/low-stock", get(handlers::inventory::get_low_stock))
        .route("/api/inventory/overstock", get(handlers::inventory::get_overstock))

        .route("/api/budgets", get(handlers::budgets::list_budgets))
        .route("/api/budgets", post(handlers::budgets::create_budget))
        .route("/api/budgets/:id", get(handlers::budgets::get_budget))
        .route("/api/budgets/:id", put(handlers::budgets::update_budget))

        .route("/api/purchases", get(handlers::purchases::list_purchases))
        .route("/api/purchases", post(handlers::purchases::create_purchase))
        .route("/api/purchases/:id", get(handlers::purchases::get_purchase))
        .route("/api/purchases/:id/status", patch(handlers::purchases::update_purchase_status))

        .route("/api/requests", get(handlers::requests::list_requests))
        .route("/api/requests", post(handlers::requests::create_request))
        .route("/api/requests/:id", get(handlers::requests::get_request))
        .route("/api/requests/:id/status", patch(handlers::requests::update_request_status))

        .layer(middleware::from_fn_with_state(
            auth_state.clone(),
            auth::auth_middleware,
        ))
        .with_state(pool)
        .with_state(auth_state)

        // Serve static files
        .nest_service("/", ServeDir::new("../frontend/dist"))

        // CORS
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .layer(TraceLayer::new_for_http());

    // Start server
    let addr = std::env::var("BIND_ADDR")
        .unwrap_or_else(|_| "0.0.0.0:3000".to_string());

    let listener = tokio::net::TcpListener::bind(&addr).await?;
    tracing::info!("Server listening on {}", addr);

    axum::serve(listener, app).await?;

    Ok(())
}
