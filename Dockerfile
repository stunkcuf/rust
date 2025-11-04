FROM rust:1.75-slim as builder
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY Cargo.toml ./
COPY backend ./backend
WORKDIR /app/backend
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/backend/target/release/inventory-backend /app/
COPY frontend/dist /app/frontend/dist
RUN mkdir -p /app/data
ENV DATABASE_URL=sqlite:/app/data/inventory.db
ENV BIND_ADDR=0.0.0.0:8080
ENV RUST_LOG=info
EXPOSE 8080
CMD ["/app/inventory-backend"]
