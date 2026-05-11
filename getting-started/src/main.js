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
camera.position.z = 2; // Move the camera back so we can see the scene

// Controls to orbit around the scene with the mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping for smoother controls

// Create a new scene
const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(1, 4); // Create an icosahedron geometry with radius 1 and detail level 2
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00, // Set the color of the material to green
// }); // No lighting will affect this material

const material = new THREE.MeshStandardMaterial({
  flatShading: true, // Use flat shading for a faceted look
}); // This material will be affected by lighting

const mesh = new THREE.Mesh(geometry, material); // Create a mesh by combining the geometry and material
scene.add(mesh); // Add the mesh to the scene

// Wire Material
const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000, // Set the color of the wireframe to black
  wireframe: true, // Enable wireframe mode
});
const wireMesh = new THREE.Mesh(geometry, wireMaterial); // Create a mesh for the wireframe using the same geometry and the wireframe material
mesh.add(wireMesh); // Add the wireframe mesh to the scene

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1); // Create a hemisphere light with white sky color, black ground color, and intensity of 1
scene.add(hemisphereLight); // Add the hemisphere light to the scene

// Animate the scene
function animateScene() {
  requestAnimationFrame(animateScene); // Request the next frame
  mesh.rotation.x += 0.0001; // Rotate the mesh around the x-axis
  mesh.rotation.y += 0.0005; // Rotate the mesh around the y-axis
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
  controls.update(); // Update the controls for damping
}

// Start the animation loop
animateScene();
