import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// Set the size of the canvas
renderer.setSize(w, h);

// Render canvas to the DOM
document.getElementById("app").appendChild(renderer.domElement);

const fov = 75; // Degree of the field of view
const aspect = w / h; // Aspect ratio of the canvas
const near = 0.1; // Anything closer than 0.1 units will not be rendered
const far = 10; // Anything farther than 10 units will not be rendered

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5; // Move the camera back so we can see the scene

// Controls to orbit around the scene with the mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping for smoother controls

// Create a new scene
const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(1, 4); // Create an icosahedron geometry with radius 1 and detail level 2
// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1); // Create a hemisphere light with white sky color, black ground color, and intensity of 1
// scene.add(hemisphereLight); // Add the hemisphere light to the scene

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Create a directional light with white color and intensity of 0.5
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight); // Add the directional light to the scene

// Add axis helper to visualize the coordinate system
const axesHelper = new THREE.AxesHelper(5); // Create an axes helper with size 5
scene.add(axesHelper); // Add the axes helper to the scene

// Create a table
const tableTopGeometry = new THREE.BoxGeometry(3, 0.1, 2); // Table top: width 3, height 0.1, depth 2
const tableTopMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b4513, // Brown color for wood
  roughness: 0.7,
  metalness: 0.1,
});
const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
tableTop.position.y = 1; // Position the table top above the origin
scene.add(tableTop); // Add table top to the scene

// Create table legs
const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1); // Leg dimensions
const legMaterial = new THREE.MeshStandardMaterial({
  color: 0x654321, // Darker brown for legs
  roughness: 0.8,
});

const legPositions = [
  [-1.4, 0.5, -0.9],
  [1.4, 0.5, -0.9],
  [-1.4, 0.5, 0.9],
  [1.4, 0.5, 0.9],
]; // Four corners for the legs

legPositions.forEach((pos) => {
  const leg = new THREE.Mesh(legGeometry, legMaterial);
  leg.position.set(pos[0], pos[1], pos[2]);
  scene.add(leg); // Add each leg to the scene
});

// Animate the scene
function animateScene() {
  requestAnimationFrame(animateScene); // Request the next frame
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
  controls.update(); // Update the controls for damping
}

// Start the animation loop
animateScene();
