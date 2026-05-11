import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import RAPIER from "@dimforge/rapier3d-compat";
import createRandomBall from "./objects/randomBall.js";
import createMouseBall from "./objects/mouseBall.js";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

// Set the size of the canvas
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);

// Render canvas to the DOM
document.getElementById("app").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
camera.position.z = 5;

// Create a new scene
const scene = new THREE.Scene();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add rapier physics
await RAPIER.init();
const gravity = new THREE.Vector3(0, -9.81, 0);
const world = new RAPIER.World(gravity);

// Create many ball objects in the center
const ballGroup = new THREE.Group();
const randomBalls = [];

for (let i = 0; i < 100; i++) {
  const randomBall = createRandomBall(world);
  randomBalls.push(randomBall);
  ballGroup.add(randomBall.ballMesh);
}

scene.add(ballGroup);

// Create ball
const { ballMesh, updateMouseBallPosition } = createMouseBall(world);
scene.add(ballMesh);

// Add sun light
const sunLight = new THREE.DirectionalLight(0xffffff, 3);
sunLight.position.set(5, 10, 7.5);
scene.add(sunLight);

// Animation loop
let mousePosition = new THREE.Vector2();

function animate(time) {
  requestAnimationFrame(animate);
  // controls.update();
  updateMouseBallPosition(mousePosition);
  world.step();

  // Update the position of each random ball mesh based on its rigid body translation
  randomBalls.forEach((ball) => ball.update());
  renderer.render(scene, camera);
}

animate();

// Handle window resize
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

// Handle mouse move
function handleMouseMove(event) {
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("mousemove", handleMouseMove, false);
