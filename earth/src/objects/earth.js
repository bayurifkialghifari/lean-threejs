import * as THREE from "three";

export function createEarth(textureLoader) {
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);

  const earthGeometry = new THREE.IcosahedronGeometry(1, 10);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("earth.jpg"),
    roughness: 1,
    metalness: 0,
  });

  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earthGroup.add(earthMesh);

  const earthDirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
  earthDirectionalLight.position.set(5, 5, 5);
  earthDirectionalLight.castShadow = true;
  earthDirectionalLight.shadow.mapSize.set(1024, 1024);
  earthDirectionalLight.shadow.camera.near = 0.5;
  earthDirectionalLight.shadow.camera.far = 50;
  earthDirectionalLight.shadow.camera.left = -5;
  earthDirectionalLight.shadow.camera.right = 5;
  earthDirectionalLight.shadow.camera.top = 5;
  earthDirectionalLight.shadow.camera.bottom = -5;
  earthGroup.add(earthDirectionalLight);

  return { earthGroup, earthMesh };
}
