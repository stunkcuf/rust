use three_d::*;
use wasm_bindgen::prelude::*;

mod systems;
use systems::clouds::CloudSystem;
use systems::particles::DustMoteSystem;

#[wasm_bindgen]
pub fn init_scene() -> Result<(), JsValue> {
    // 🎯 Grab the canvas element by ID
    let canvas = Canvas::from_id("game-canvas")?;
    let context = Context::from_canvas(&canvas)?;

    // 🌌 Create the scene
    let mut scene = Scene::new();

    // 🎥 Setup perspective camera
    let mut camera = Camera::new_perspective(
        scene.viewport(),
        vec3(0.0, 3.0, 10.0), // Camera position
        vec3(0.0, 1.0, 0.0),  // Look-at target
        vec3(0.0, 1.0, 0.0),  // Up vector
        degrees(75.0),
        0.1,
        1000.0,
    );

    // ☁️ Setup cloud material
    let cloud_material = PhysicalMaterial::new(&context, &CpuMaterial {
        albedo: Srgba::WHITE,
        alpha: 0.85,
        transparency: Transparency::Blend,
        ..Default::default()
    })?;

    // ☁️ Initialize clouds
    let mut clouds = CloudSystem::new(&context, &cloud_material, 15);
    clouds.add_to(&mut scene);

    // 🌪️ Initialize dust motes
    let mut dust = DustMoteSystem::new(&context, "medium");
    dust.add_to(&mut scene);

    // 🔁 Main render loop
    FrameInput::new(context).render_loop(move |input| {
        camera.set_viewport(input.viewport);

        // ✨ Update world
        clouds.update(input.elapsed_time);
        dust.update(input.elapsed_time);

        // 🖼️ Render frame
        input.screen().clear_color(0.1, 0.1, 0.1, 1.0);
        scene.render_color(&camera, input.screen());

        FrameOutput::default()
    });

    Ok(())
}
