import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";

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
camera.position.z = 2; // Move the camera back so we can see the scene

// Controls to orbit around the scene with the mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping for smoother controls

// Create a new scene
const scene = new THREE.Scene();

const teapotGeometry = new TeapotGeometry(
  0.5, // Size of the teapot
  10, // Number of segments (higher means smoother)
  true, // Whether to include the bottom of the teapot
  true, // Whether to include the lid of the teapot
  true, // Whether to include the body of the teapot
  true, // Whether to include the handle of the teapot
  true, // Whether to include the spout of the teapot
);
const material = new THREE.MeshStandardMaterial({
  color: 0x808080,
}); // Create a basic material with gray color and wireframe mode

const teapot = new THREE.Mesh(teapotGeometry, material);

const mesh = new THREE.Mesh(teapotGeometry, material); // Create a mesh by combining the geometry and material
scene.add(mesh); // Add the mesh to the scene

const sunLight = new THREE.DirectionalLight(0xffff00, 1); // Create a directional light with yellow color and intensity of 1
scene.add(sunLight); // Add the sun light to the scene

// Animate the scene
function animateScene() {
  requestAnimationFrame(animateScene); // Request the next frame
  // mesh.rotation.x += 0.005; // Rotate the mesh around the x-axis
  mesh.rotation.y += 0.005; // Rotate the mesh around the y-axis
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
  controls.update(); // Update the controls for damping
}

// Start the animation loop
animateScene();
