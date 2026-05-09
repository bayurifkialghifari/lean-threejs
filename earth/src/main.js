import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createEarth } from "./objects/earth.js";
import { createMoon, updateMoonOrbit } from "./objects/moon.js";
import { createStartField } from "./objects/startField.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.setSize(w, h);

document.getElementById("app").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 200);
camera.position.z = 8;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0x111111, 1.0);
scene.add(ambientLight);

const hemi = new THREE.HemisphereLight(0x99ddff, 0x220022, 0.25);
scene.add(hemi);

const { earthGroup, earthMesh } = createEarth(textureLoader);
const moon = createMoon(textureLoader, 4);

earthGroup.add(moon.moonGroup);
scene.add(earthGroup);

const starField = createStartField(textureLoader, 1000);
scene.add(starField);

function animateScene() {
  requestAnimationFrame(animateScene);

  updateMoonOrbit(moon, 0.02);

  earthMesh.rotation.y += 0.005;
  moon.moonMesh.rotation.y += 0.001;

  renderer.render(scene, camera);
  controls.update();
}

animateScene();
