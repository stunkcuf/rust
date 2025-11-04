# Build stage
FROM rust:1.75-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy workspace files
COPY Cargo.toml ./
COPY backend ./backend

# Build the application
WORKDIR /app/backend
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/backend/target/release/inventory-backend /app/

# Copy frontend files
COPY frontend/dist /app/frontend/dist

# Create data directory for SQLite
RUN mkdir -p /app/data

# Set environment variables
ENV DATABASE_URL=sqlite:/app/data/inventory.db
ENV BIND_ADDR=0.0.0.0:8080
ENV RUST_LOG=info

EXPOSE 8080

CMD ["/app/inventory-backend"]
