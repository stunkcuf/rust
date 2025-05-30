use wasm_bindgen::prelude::*;
use web_sys::{console, window};
mod login;
mod graphics;
mod multiplayer;

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    console_error_panic_hook::set_once();

    login::check_session()?; // Redirects if not logged in
    graphics::init_scene()?; // Setup WebGL scene
    multiplayer::connect()?; // Start SpacetimeDB connection

    Ok(())
}
