import * as THREE from "three";
import { renderer, camera, scene, controls, world, ballPhysics } from "../init";

export default class TickManager {
  constructor() {}

  // Start the animation loop
  loopAnimation() {
    const animate = (timestamp) => {
      controls.update();

      // Update the position of each ball based on its physics body
      ballPhysics.forEach((ball) => {
        ball.update();
      });

      world.step();
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);
  }
}
