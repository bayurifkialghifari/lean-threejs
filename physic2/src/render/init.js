import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GroundController from "./controller/ground";
import BallPhysicController from "./controller/ballphysic";
import LightController from "./controller/light";
import TickManager from "./controller/tick-manager";
import RAPIER from "@dimforge/rapier3d-compat";
import { cameraPosition } from "three/src/nodes/TSL.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add RAPIER gravity to the scene
await RAPIER.init();
const gravity = new THREE.Vector3(0, -9.81, 0);
const world = new RAPIER.World(gravity);

// Add ground to the scene
const groundController = new GroundController();
scene.add(groundController.addGround());

// Add sunlight to the scene
const lighController = new LightController();
scene.add(lighController.addDirectionalLight());

// Create bunch of spheres and add them to the scene
const ballPhysicController = new BallPhysicController();
const ballPhysics = ballPhysicController.createMesh(0.5, 32, 0xff0000, 100);

// Init function to set up the renderer and add it to the DOM
export function initEngine(
  element,
  options = {
    cameraPosition: new THREE.Vector3(0, 20, 50),
  },
) {
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set the camera position from options
  camera.position.copy(options.cameraPosition);

  element.appendChild(renderer.domElement);

  // Tick manager
  const tickManager = new TickManager();
  tickManager.loopAnimation();
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

export { scene, camera, renderer, controls, RAPIER, world, ballPhysics };
