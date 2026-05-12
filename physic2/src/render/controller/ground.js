import * as THREE from "three";
import { RAPIER, world, ballPhysics } from "../init";

export default class GroundController {
  constructor() {}

  addGround(color = 0x808080, size = 100) {
    const groundGeometry = new THREE.PlaneGeometry(size, size);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: color });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    // Set ground physics body
    const groundBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
    const groundBody = world.createRigidBody(groundBodyDesc);
    const groundColliderDesc = RAPIER.ColliderDesc.cuboid(
      size / 2,
      0.1,
      size / 2,
    );
    world.createCollider(groundColliderDesc, groundBody);

    return ground;
  }
}
