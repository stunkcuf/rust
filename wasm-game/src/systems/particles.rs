use three_d::*;
use rand::prelude::*;

/// System representing ambient dust motes that float and wrap in 3D space.
pub struct DustMoteSystem {
    instances: Instances,
    positions: Vec<Vec3>,
    count: usize,
}

impl DustMoteSystem {
    /// Create a new DustMoteSystem with quality level: "low", "medium", or "high"
    pub fn new(context: &Context, quality: &str) -> Self {
        let count = match quality.to_lowercase().as_str() {
            "low" => 1000,
            "medium" => 5000,
            "high" => 8000,
            _ => 5000,
        };

        let mut rng = thread_rng();
        let mut positions = vec![];

        for _ in 0..count {
            let x = rng.gen_range(-100.0..100.0);
            let y = rng.gen_range(1.0..20.0);
            let z = rng.gen_range(-100.0..100.0);
            positions.push(vec3(x, y, z));
        }

        let base_shape = CpuMesh::sphere(6); // More detailed dust sphere

        let material = PhysicalMaterial::new(context, &CpuMaterial {
            albedo: Srgba::GRAY,
            alpha: 0.65,
            transparency: Transparency::Blend,
            lighting_model: LightingModel::Unlit,
            ..Default::default()
        }).unwrap();

        let transforms = positions
            .iter()
            .map(|p| Mat4::from_translation(*p) * Mat4::from_scale(0.1))
            .collect::<Vec<_>>();

        let instances = Instances::new(context, &base_shape, &material, &transforms).unwrap();

        Self {
            instances,
            positions,
            count,
        }
    }

    /// Update dust positions each frame using delta time
    pub fn update(&mut self, delta_time: f32) {
        for pos in &mut self.positions {
            let wave = (pos.x * 0.07 + delta_time * 0.5).sin() * 0.005;
            pos.y += 0.003 + wave;

            // Wrap around
            if pos.y > 25.0 {
                pos.y = 1.0;
            }
        }

        let transforms = self.positions
            .iter()
            .map(|p| Mat4::from_translation(*p) * Mat4::from_scale(0.1))
            .collect::<Vec<_>>();

        self.instances.set_transformation(&transforms);
    }

    /// Add this particle system to the scene
    pub fn add_to(&self, scene: &mut Scene) {
        scene.add(&self.instances);
    }
}
