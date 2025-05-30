use three_d::*;
use rand::prelude::*;

pub struct Cloud {
    pub mesh: Mesh,
    pub speed_x: f32,
    pub speed_z: f32,
}

pub struct CloudSystem {
    pub group: Group,
    pub clouds: Vec<Cloud>,
    pub rotation_speed: f32,
    pub bounds: f32,
}

impl CloudSystem {
    pub fn new(context: &Context, material: &PhysicalMaterial, cloud_count: usize) -> Self {
        let mut rng = thread_rng();
        let mut clouds = vec![];
        let mut group = Group::new();

        let cloud_alt_min = 80.0;
        let cloud_alt_max = 120.0;
        let spread = 300.0;
        let wave_speed_x = 0.02;
        let wave_speed_z = 0.003;
        let var_x = 0.005;
        let var_z = 0.002;

        for _ in 0..cloud_count {
            let mut geometries = vec![];

            let puff_count = rng.gen_range(4..=8);
            for _ in 0..puff_count {
                let scale = rng.gen_range(2.5..6.0);
                let mut geo = Geometry::icosphere(context, 1);

                geo.transform(
                    Mat4::from_translation(vec3(
                        rng.gen_range(-5.0..5.0),
                        rng.gen_range(-3.0..3.0),
                        rng.gen_range(-5.0..5.0),
                    ))
                    * Mat4::from_scale(scale),
                );

                geometries.push(geo);
            }

            let cloud_geometry = Geometry::merge(context, &geometries).unwrap();
            let mesh = Mesh::new(context, &cloud_geometry, material).unwrap();

            mesh.set_position(vec3(
                rng.gen_range(-spread..spread),
                rng.gen_range(cloud_alt_min..cloud_alt_max),
                rng.gen_range(-spread..spread),
            ));

            group.add(&mesh);

            clouds.push(Cloud {
                mesh,
                speed_x: wave_speed_x + rng.gen_range(-var_x..var_x),
                speed_z: wave_speed_z + rng.gen_range(-var_z..var_z),
            });
        }

        CloudSystem {
            group,
            clouds,
            rotation_speed: 0.00005,
            bounds: spread,
        }
    }

    pub fn update(&mut self, delta: f32) {
        self.group.set_rotation(self.group.rotation() * Quat::from_rotation_y(self.rotation_speed));

        for cloud in &mut self.clouds {
            let mut pos = cloud.mesh.position();
            pos.x += cloud.speed_x * delta;
            pos.z += cloud.speed_z * delta;

            // Wraparound
            if pos.x.abs() > self.bounds {
                pos.x = -pos.x;
            }
            if pos.z.abs() > self.bounds {
                pos.z = -pos.z;
            }

            cloud.mesh.set_position(pos);
        }
    }

    pub fn add_to(&self, scene: &mut Scene) {
        scene.add(&self.group);
    }
}
