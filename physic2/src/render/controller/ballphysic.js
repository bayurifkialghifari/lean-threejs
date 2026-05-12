import * as THREE from "three";
import { scene, world, RAPIER } from "../init.js";

export default class BallPhysicController {
  createMesh(radius, size = 32, color, balls = 100) {
    // Add bunch of spheres to the scene
    const sphereGeometry = new THREE.SphereGeometry(radius, size, size);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: color });
    const physics = [];

    for (let i = 0; i <= balls; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      // Random position for the sphere
      sphere.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 5 + 5,
        (Math.random() - 0.5) * 10,
      );

      // Add physics body to the sphere
      const sphereRigidBodyDesc = new RAPIER.RigidBodyDesc(
        "dynamic",
      ).setTranslation(sphere.position.x, sphere.position.y, sphere.position.z);

      // Create the rigid body and collider for the ball
      const sphereBody = world.createRigidBody(sphereRigidBodyDesc);
      const sphereColiderDesc =
        RAPIER.ColliderDesc.ball(radius).setDensity(radius);
      world.createCollider(sphereColiderDesc, sphereBody);

      function updateSpherePosition() {
        const position = sphereBody.translation();
        sphere.position.set(position.x, position.y, position.z);
      }

      // Push the mesh and body to the physics array for later use
      physics.push({
        mesh: sphere,
        body: sphereBody,
        update: updateSpherePosition,
      });

      scene.add(sphere);
    }

    return physics;
  }
}
