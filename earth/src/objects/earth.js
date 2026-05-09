import * as THREE from "three";

export function createEarth(textureLoader) {
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);

  const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load("earth.jpg"),
    specularMap: textureLoader.load("earthspec.jpg"),
    bumpMap: textureLoader.load("earthbump.jpg"),
    bumpScale: 0.05,
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

  // Add cloud layer
  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("cloud.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: textureLoader.load("cloud2.jpg"),
  });
  const cloudMesh = new THREE.Mesh(earthGeometry, cloudMaterial);
  cloudMesh.scale.setScalar(1.003);
  earthGroup.add(cloudMesh);

  return { earthGroup, earthMesh, cloudMesh };
}
