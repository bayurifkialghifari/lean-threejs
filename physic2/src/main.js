import { initEngine, renderer, controls, scene, camera } from "./render/init";

(async () => {
  await initEngine(document.getElementById("app"));
})();
