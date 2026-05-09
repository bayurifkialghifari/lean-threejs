import * as THREE from "three";

export function createStartField(textureLoader, startCount = 1000) {
  function randomPosition() {
    const radius = 100;
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: textureLoader.load("star.png"),
  });

  const starField = new THREE.Group();
  for (let i = 0; i < startCount; i++) {
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    starMesh.position.copy(randomPosition());
    starField.add(starMesh);
  }
  return starField;
}
