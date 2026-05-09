import * as THREE from "three";

export function createMoon(textureLoader, orbitRadius = 4) {
  const moonGroup = new THREE.Group();

  const moonGeometry = new THREE.IcosahedronGeometry(0.27, 10);
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("moon.jpg"),
    roughness: 1,
    metalness: 0,
  });

  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moonGroup.add(moonMesh);

  moonGroup.position.set(orbitRadius, 0, 0);

  const moonLight = new THREE.DirectionalLight(0xffffff, 0.05);
  moonLight.position.set(2, 0, 0);
  moonGroup.add(moonLight);

  return {
    moonGroup,
    moonMesh,
    orbitRadius,
    angle: 0,
  };
}

export function updateMoonOrbit(moon, speed = 0.02) {
  moon.angle += speed;
  moon.moonGroup.position.x = moon.orbitRadius * Math.cos(moon.angle);
  moon.moonGroup.position.z = moon.orbitRadius * Math.sin(moon.angle);
}
