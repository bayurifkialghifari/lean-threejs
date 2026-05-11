import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d-compat";

export default function createRandomBall(world) {
  const radius = 0.5;
  const geometry = new THREE.IcosahedronGeometry(radius);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
  });
  const ballMesh = new THREE.Mesh(geometry, material);

  const startPosition = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
  );
  ballMesh.position.copy(startPosition);

  const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
    startPosition.x,
    startPosition.y,
    startPosition.z,
  );

  // Create the rigid body and collider for the ball
  let rigidBody = world.createRigidBody(rigidBodyDesc);
  let colliderDesc = RAPIER.ColliderDesc.ball(radius).setDensity(radius);

  world.createCollider(colliderDesc, rigidBody);

  // Reset all the forces and torques acting on the rigid body to zero
  function update() {
    rigidBody.resetForces();
    let { x, y, z } = rigidBody.translation();
    const position = new THREE.Vector3(x, y, z);
    const dir = position
      .clone()
      .sub(new THREE.Vector3(0, 0, 0))
      .normalize();
    rigidBody.addForce(dir.multiplyScalar(-10), true);
    ballMesh.position.set(x, y, z);
  }

  return {
    ballMesh,
    rigidBody,
    update,
  };
}
