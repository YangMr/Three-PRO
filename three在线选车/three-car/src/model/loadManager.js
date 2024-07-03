import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * 专门加载模型文件的
 * @param {*} path  模型文件的路径
 * @returns
 */
export function loadManager(path) {
  return new Promise((resolve, reject) => {
    // 初始化模型加载器
    const gltfLoader = new GLTFLoader();

    // 加载模型
    gltfLoader.load(
      path,
      (gltf) => {
        resolve(gltf.scene);
      },
      (process) => {
        // console.log("process", process);
      },
      (error) => {
        reject(error);
        throw new Error(error);
      }
    );
  });
}
