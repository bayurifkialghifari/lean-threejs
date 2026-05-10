import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import resizeRendererToDisplaySize from "./utils/resize.js";
import createCube from "./objects/cube.js";
import TWEEN from "@tweenjs/tween.js";

// Tween group to manage multiple tweens together
const tweenGroup = new TWEEN.Group();

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

// Multiple cube
const cubeGroup = new THREE.Group();
const cubeInterval = 0.02; // Time interval between cube generation
let lastCubeTime = 0;
cubeGroup.body = {
  update: (time) => {
    if (time > lastCubeTime) {
      const { cubeMesh } = createCube({
        size: 0.5,
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        wireframe: false,
        side: THREE.BackSide,
      });

      // Set initial position of the cube
      cubeMesh.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      );
      cubeMesh.position.normalize().multiplyScalar(
        0.75 + Math.random() * 4, // Random distance from the center
      );
      cubeMesh.scale.setScalar(0.01); // Start with a small scale
      cubeMesh.body = {
        start: (shouldScale = true) => {
          const targetScale = shouldScale ? 1 : 0.01;
          const delay = shouldScale ? 0 : 1000; // Delay before shrinking back
          new TWEEN.Tween(cubeMesh.scale, tweenGroup)
            .to({ x: targetScale, y: targetScale, z: targetScale }, 1000)
            .easing(TWEEN.Easing.Elastic.Out)
            .delay(delay)
            .onComplete(() => {
              if (shouldScale) {
                cubeMesh.body.start(false);
              }
            })
            .start();
          new TWEEN.Tween(cubeMesh.rotation, tweenGroup)
            .to(new THREE.Vector3().random())
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .start();
        },
      };
      cubeMesh.body.start(true);

      cubeGroup.add(cubeMesh);

      // Add inner cube that shrinks back after a delay
      const { cubeMesh: innerCubeMesh } = createCube({
        size: 0.25,
        color: 0x0000ff,
        wireframe: false,
      });
      innerCubeMesh.scale.setScalar(1.5); // Start with a small scales
      cubeMesh.add(innerCubeMesh);
      lastCubeTime = time + cubeInterval;
    }

    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.02;
  },
};
scene.add(cubeGroup);

// Animate the scene
function animateScene(time = 0) {
  requestAnimationFrame(animateScene);
  cubeGroup.body.update(time * 0.0002); // Generate new cubes every 2 seconds
  tweenGroup.update(time);
  renderer.render(scene, camera);
  controls.update();
}

// Handle window resize
window.addEventListener("resize", () =>
  resizeRendererToDisplaySize(renderer, camera),
);

// Start the animation loop
animateScene();
