use wasm_bindgen::prelude::*;
use web_sys::{window, Document, HtmlInputElement, HtmlFormElement, HtmlElement};
use gloo::events::EventListener;
use serde::{Serialize, Deserialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
struct Character {
    name: String,
    faction: String,
    sub_faction: Option<String>,
}

#[wasm_bindgen]
pub fn init_character_creation() -> Result<(), JsValue> {
    let document = window().unwrap().document().unwrap();

    let form = document
        .get_element_by_id("character-creation-form")
        .unwrap()
        .dyn_into::<HtmlFormElement>()?;

    let name_input = document
        .get_element_by_id("character-name")
        .unwrap()
        .dyn_into::<HtmlInputElement>()?;

    let faction_buttons = document.query_selector_all(".faction-button")?;
    let sub_faction_buttons = document.get_element_by_id("sub-faction-buttons-container").unwrap();

    let document_clone = document.clone();

    let closure = Closure::wrap(Box::new(move |event: web_sys::Event| {
        event.prevent_default();

        let character_name = name_input.value().trim().to_string();
        if character_name.is_empty() {
            web_sys::window()
                .unwrap()
                .alert_with_message("Please enter a character name.")
                .unwrap();
            return;
        }

        // Get selected faction
        let selected_faction = (0..faction_buttons.length())
            .find_map(|i| {
                let button = faction_buttons.get(i).unwrap();
                let class_list = button.class_list();
                if class_list.contains("selected") {
                    Some(button.get_attribute("data-faction").unwrap())
                } else {
                    None
                }
            });

        if selected_faction.is_none() {
            web_sys::window()
                .unwrap()
                .alert_with_message("Please select a faction.")
                .unwrap();
            return;
        }

        // Get selected sub-faction (if visible)
        let mut selected_sub_faction: Option<String> = None;
        let sub_buttons = sub_faction_buttons.children();
        for i in 0..sub_buttons.length() {
            let btn = sub_buttons.item(i).unwrap();
            if btn.class_list().contains("selected") {
                selected_sub_faction = btn.get_attribute("data-sub-faction");
                break;
            }
        }

        let username = match window()
            .unwrap()
            .session_storage()
            .unwrap()
            .unwrap()
            .get_item("username")
            .unwrap()
        {
            Some(u) => u,
            None => {
                window()
                    .unwrap()
                    .alert_with_message("No session. Redirecting to login...")
                    .unwrap();
                window()
                    .unwrap()
                    .location()
                    .set_href("login.html")
                    .unwrap();
                return;
            }
        };

        // Check uniqueness
        let storage = window().unwrap().local_storage().unwrap().unwrap();
        let key = format!("characters_{}", username);
        let existing_data = storage.get_item(&key).unwrap();
        let mut characters: Vec<Character> = match existing_data {
            Some(json_str) => serde_json::from_str(&json_str).unwrap_or_default(),
            None => vec![],
        };

        if characters.iter().any(|c| c.name.eq_ignore_ascii_case(&character_name)) {
            window()
                .unwrap()
                .alert_with_message("Character with this name already exists.")
                .unwrap();
            return;
        }

        let new_character = Character {
            name: character_name.clone(),
            faction: selected_faction.unwrap(),
            sub_faction: selected_sub_faction.clone(),
        };

        characters.push(new_character);
        let json = serde_json::to_string(&characters).unwrap();
        storage.set_item(&key, &json).unwrap();

        let session = window().unwrap().session_storage().unwrap().unwrap();
        session.set_item("characterName", &character_name).unwrap();
        session.set_item("characterFaction", &selected_faction.unwrap()).unwrap();

        if let Some(sub) = &selected_sub_faction {
            session.set_item("characterSubFaction", sub).unwrap();
        } else {
            session.remove_item("characterSubFaction").unwrap();
        }

        window()
            .unwrap()
            .location()
            .set_href("character-select.html")
            .unwrap();
    }) as Box<dyn FnMut(_)>);

    form.set_onsubmit(Some(closure.as_ref().unchecked_ref()));
    closure.forget();

    Ok(())
}
