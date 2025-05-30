use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    window, Document, HtmlElement, HtmlButtonElement, HtmlDivElement, Element,
};
use serde::{Deserialize, Serialize};
use gloo::events::EventListener;

#[derive(Serialize, Deserialize, Clone)]
pub struct Character {
    pub name: String,
    pub faction: String,
    pub sub_faction: Option<String>,
}

#[wasm_bindgen]
pub fn init_character_select() -> Result<(), JsValue> {
    let window = window().unwrap();
    let document = window.document().unwrap();

    let username = match window.session_storage()?.unwrap().get_item("username")? {
        Some(u) => u,
        None => {
            window.location().set_href("login.html")?;
            return Ok(());
        }
    };

    let character_list = document.get_element_by_id("character-list").unwrap();
    let no_char_msg = document.get_element_by_id("no-characters-message").unwrap();

    let storage = window.local_storage()?.unwrap();
    let char_key = format!("characters_{}", username);
    let stored = storage.get_item(&char_key)?.unwrap_or_else(|| "[]".to_string());

    let characters: Vec<Character> = serde_json::from_str(&stored).unwrap_or_default();

    if characters.is_empty() {
        no_char_msg.set_attribute("style", "display: block;")?;
        return Ok(());
    } else {
        no_char_msg.set_attribute("style", "display: none;")?;
    }

    for character in characters.clone() {
        let div = document.create_element("div")?.dyn_into::<HtmlDivElement>()?;
        div.set_class_name("character-item");

        let name = &character.name;
        let faction_tag = &character.faction.to_uppercase();
        let sub = character.sub_faction.clone().unwrap_or("None".into());

        div.set_inner_html(&format!(
            "<span class=\"character-name\">{}</span>\
             <span class=\"character-faction\">{}</span>\
             <span class=\"character-sub-faction\">{}</span>\
             <button class=\"character-delete-button\" data-char-name=\"{}\">X</button>",
            name, faction_tag, sub, name
        ));

        {
            // Click to select character
            let character_clone = character.clone();
            let div_clone = div.clone();
            let listener = EventListener::new(&div, "click", move |event| {
                let target = event.target().unwrap();
                let is_delete = target
                    .dyn_ref::<Element>()
                    .map(|el| el.class_list().contains("character-delete-button"))
                    .unwrap_or(false);
                if is_delete {
                    return;
                }

                let session = window().unwrap().session_storage().unwrap().unwrap();
                session
                    .set_item("characterName", &character_clone.name)
                    .unwrap();
                session
                    .set_item("characterFaction", &character_clone.faction)
                    .unwrap();
                if let Some(sub) = &character_clone.sub_faction {
                    session.set_item("characterSubFaction", sub).unwrap();
                } else {
                    session.remove_item("characterSubFaction").unwrap();
                }
                window().unwrap().location().set_href("index.html").unwrap();
            });
            listener.forget();
        }

        {
            // Click to delete character
            let div_clone = div.clone();
            let character_name = character.name.clone();
            let username = username.clone();
            let document_clone = document.clone();
            let listener = EventListener::new(
                &div
                    .query_selector(".character-delete-button")
                    .unwrap()
                    .unwrap(),
                "click",
                move |event| {
                    event.stop_propagation(); // Don't bubble to select

                    let confirmed = window()
                        .unwrap()
                        .confirm_with_message(&format!(
                            "Are you sure you want to delete {}?",
                            character_name
                        ))
                        .unwrap();
                    if !confirmed {
                        return;
                    }

                    let storage = window().unwrap().local_storage().unwrap().unwrap();
                    let key = format!("characters_{}", username);
                    let stored = storage.get_item(&key).unwrap().unwrap_or("[]".into());
                    let mut chars: Vec<Character> =
                        serde_json::from_str(&stored).unwrap_or_default();

                    chars.retain(|c| c.name.to_lowercase() != character_name.to_lowercase());
                    storage.set_item(&key, &serde_json::to_string(&chars).unwrap()).unwrap();

                    let session = window().unwrap().session_storage().unwrap().unwrap();
                    if session.get_item("characterName").unwrap()
                        == Some(character_name.to_string())
                    {
                        session.remove_item("characterName").unwrap();
                        session.remove_item("characterFaction").unwrap();
                        session.remove_item("characterSubFaction").unwrap();
                    }

                    // Remove element from DOM
                    let parent = div_clone.parent_node().unwrap();
                    parent.remove_child(&div_clone).unwrap();
                },
            );
            listener.forget();
        }

        character_list.append_child(&div)?;
    }

    // Add event for "create new character"
    if let Some(btn) = document.get_element_by_id("create-new-character-button") {
        let listener = EventListener::new(&btn, "click", move |_| {
            window()
                .unwrap()
                .location()
                .set_href("character-creation.html")
                .unwrap();
        });
        listener.forget();
    }

    // Add logout button handler
    if let Some(logout_btn) = document.get_element_by_id("logout-from-select") {
        let listener = EventListener::new(&logout_btn, "click", move |e| {
            e.prevent_default();
            let session = window().unwrap().session_storage().unwrap().unwrap();
            session.remove_item("isLoggedIn").unwrap();
            session.remove_item("username").unwrap();
            session.remove_item("characterName").unwrap();
            session.remove_item("characterFaction").unwrap();
            session.remove_item("characterSubFaction").unwrap();
            window()
                .unwrap()
                .location()
                .set_href("login.html")
                .unwrap();
        });
        listener.forget();
    }

    Ok(())
}
