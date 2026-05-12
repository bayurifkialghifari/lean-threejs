import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

const _loadGltf = async (path) => {
  const gltfLoader = new GLTFLoader();
  const gltf = await gltfLoader.loadAsync(
    // URL of the gltf you want to load
    path,
    // called while loading is progressing
    (progress) =>
      console.log(
        `Loading gltf file from ${path} ...`,
        100.0 * (progress.loaded / progress.total),
        "%",
      ),
  );

  return gltf;
};
const _loadVrm = async (path) => {
  const gltfLoader = new GLTFLoader();
  const vrm = await gltfLoader.loadAsync(
    // URL of the VRM you want to load
    path,

    // called while loading is progressing
    (progress) =>
      console.log(
        `Loading vrm file from ${path} ...`,
        100.0 * (progress.loaded / progress.total),
        "%",
      ),
  );

  return vrm;
};

const _loadTexture = async (path) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = await textureLoader.loadAsync(
    path,

    // called while loading is progressing
    (progress) =>
      console.log(
        `Loading image from ${path} ...`,
        100.0 * (progress.loaded / progress.total),
        "%",
      ),
  );

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return texture;
};

class GeneralLoader {
  constructor() {}

  async load(path) {
    const fileType = path.split(".").pop();

    let file = null;

    switch (fileType) {
      case "gltf": {
        file = await _loadGltf(path);
        return file?.scene;
      }

      case "vrm": {
        file = await _loadVrm(path);
        return file?.scene;
      }

      case "png": {
        file = await _loadTexture(path);
        return file;
      }

      case "png": {
        file = await _loadTexture(path);
        return file;
      }

      default: {
        console.error(`GeneralLoader: File type ${fileType} is not supported.`);
        return file;
      }
    }
  }
}

export default GeneralLoader;
