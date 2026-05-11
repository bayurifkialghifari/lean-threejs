import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d-compat";

export default function createMouseBall(world) {
  const radius = 0.3;
  const ballGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const ballMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  const ballPointLight = new THREE.PointLight(0xffffff, 2);
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  ballMesh.add(ballPointLight);

  // Create the rigid body and collider for the ball
  const rigidBodyDesc =
    RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 1);
  const rigidBody = world.createRigidBody(rigidBodyDesc);
  const colliderDesc = RAPIER.ColliderDesc.ball(radius)
    .setRestitution(1.0)
    .setFriction(0.0);
  world.createCollider(colliderDesc, rigidBody);

  function updateMouseBallPosition(mousePosition) {
    // Scale the mouse position to the world coordinates
    const nextPosition = new RAPIER.Vector3(
      mousePosition.x * 5,
      mousePosition.y * 5,
      1,
    );
    // Set the next position of the kinematic rigid body
    rigidBody.setNextKinematicTranslation(nextPosition);
    ballMesh.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
  }

  return {
    ballMesh,
    rigidBody,
    updateMouseBallPosition,
  };
}
