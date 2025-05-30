use spacetimedb::{Client, ConnectOptions};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn connect() -> Result<(), JsValue> {
    wasm_bindgen_futures::spawn_local(async {
        let client = Client::connect(
            "wss://demo.spacetimedb.io", 
            ConnectOptions::default()
        ).await;

        match client {
            Ok(_) => web_sys::console::log_1(&"✅ Connected to SpacetimeDB".into()),
            Err(e) => web_sys::console::error_1(&format!("SpacetimeDB Error: {:?}", e).into())
        }
    });

    Ok(())
}
