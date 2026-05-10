import * as THREE from "three";

export default function createCube({
  size = 1,
  color = 0x00ff00,
  wireframe = true,
  side = THREE.DoubleSide,
}) {
  const cubeGeometry = new THREE.BoxGeometry(size, size, size);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: wireframe,
    side: side,
  });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  return {
    cubeGeometry,
    cubeMaterial,
    cubeMesh,
  };
}
