import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import spline from "./spline.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(w, h);

// Render canvas to the DOM
document.getElementById("app").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5; // Move the camera back so we can see the scene

// Controls to orbit around the scene with the mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping for smoother controls

// Create a new scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.3); // Add fog for depth effect

const points = spline.getPoints(100);
// const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // side: THREE.DoubleSide,
  wireframe: true,
});

const geometry = new THREE.TubeGeometry(spline, 220, 0.65, 16, true);
// const line = new THREE.Line(geometry, material);
const tube = new THREE.Mesh(geometry, material);
// scene.add(tube);

// Edge geometry for the tube
const edges = new THREE.EdgesGeometry(geometry, 0.2);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
scene.add(edgeLines);

// Add some boxes along the path for visual interest
const boxGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
for (let i = 0; i < 100; i++) {
  const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);

  const boxEdge = new THREE.EdgesGeometry(boxGeometry, 0.1);
  const boxLine = new THREE.LineBasicMaterial({ color });
  const box = new THREE.LineSegments(boxEdge, boxLine);

  const p = Math.random(); // Random position along the path
  const pos = tube.geometry.parameters.path.getPointAt(p);
  box.position.copy(pos);
  const rote = new THREE.Vector3(
    Math.random(),
    Math.random(),
    Math.random(),
  ).normalize();
  box.rotation.set(rote.x, rote.y, rote.z);
  box.position.add(
    new THREE.Vector3(
      tube.geometry.parameters.path.getTangentAt(p).y * 0.5,
      tube.geometry.parameters.path.getTangentAt(p).x * 0.5,
      tube.geometry.parameters.path.getTangentAt(p).z * 0.5,
    ),
  ); // Add some random offset to the box position
  scene.add(box);

  // Rotate the box randomly over time
  const rotateSpeed = Math.random() * 0.01 + 0.005;
  function rotateBox() {
    box.rotation.x += rotateSpeed;
    box.rotation.y += rotateSpeed;
    requestAnimationFrame(rotateBox);
  }
  rotateBox();
}

// Update camera position every frame
function updateCamera(timestamp) {
  const time = timestamp * 0.1; // Scale time for smoother movement
  const looptime = 10 * 1000; // Time for one loop in milliseconds
  const p = (time % looptime) / looptime; // Normalized position along the path (0 to 1)
  const pos = tube.geometry.parameters.path.getPointAt(p); // Get the position on the path at the current time
  const lookAt = tube.geometry.parameters.path.getPointAt((p + 0.03) % 1); // Look slightly ahead on the path
  camera.position.copy(pos);
  camera.lookAt(lookAt);

  // Change tube color based on time for visual interest
  // const hue = (time * 0.05) % 1; // Cycle through hues over time
  // edgeMaterial.color.setHSL(hue, 1, 0.5);
}

// Animate the scene
function animateScene(timestamp = 0) {
  requestAnimationFrame(animateScene);
  updateCamera(timestamp);
  renderer.render(scene, camera);
  controls.update();
}

animateScene();

function handleResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", handleResize);
