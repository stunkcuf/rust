use wasm_bindgen::prelude::*;
use web_sys::window;

pub fn check_session() -> Result<(), JsValue> {
    let storage = window()
        .unwrap()
        .session_storage()?
        .ok_or("No session storage")?;

    let is_logged_in = storage.get_item("isLoggedIn")?.unwrap_or_default();
    if is_logged_in != "true" {
        window().unwrap().location().set_href("login.html")?;
        return Err("Not logged in".into());
    }

    Ok(())
}
