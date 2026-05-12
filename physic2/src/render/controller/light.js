import * as THREE from "three";

export default class LightController {
  constructor() {}

  addAmbientLight(color = 0xffffff, intensity = 0.5) {
    const ambientLight = new THREE.AmbientLight(color, intensity);
    return ambientLight;
  }

  addDirectionalLight(
    color = 0xffffff,
    intensity = 1,
    position = new THREE.Vector3(10, 10, 10),
  ) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.copy(position);
    directionalLight.castShadow = true;
    return directionalLight;
  }

  addPointLight(
    color = 0xffffff,
    intensity = 1,
    position = new THREE.Vector3(0, 5, 0),
  ) {
    const pointLight = new THREE.PointLight(color, intensity);
    pointLight.position.copy(position);
    pointLight.castShadow = true;
    return pointLight;
  }

  addSpotLight(
    color = 0xffffff,
    intensity = 1,
    position = new THREE.Vector3(0, 5, 0),
    target = new THREE.Vector3(0, 0, 0),
  ) {
    const spotLight = new THREE.SpotLight(color, intensity);
    spotLight.position.copy(position);
    spotLight.target.position.copy(target);
    spotLight.castShadow = true;
    return spotLight;
  }
}
