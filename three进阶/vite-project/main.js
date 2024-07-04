// 目标：标准网格材质 - 粗糙度和贴图
// 定义：一种基于物理渲染（PBR）的标准材质
// 作用：除了比前两种材质受光照影响外，可以设置粗糙度
// 使用：替换网格材质的构造函数为 MeshStandardMaterial
// 粗糙度贴图原理：黑色（光滑，高光），白色（粗糙，不反光，散射）

import { scene } from "./utils/init";
import * as THREE from "three";
import dat from "dat.gui";

// 创建物体
function initBase() {
  // 1. 创建球形缓存几何体
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const cubeLoad = new THREE.CubeTextureLoader();
  const cubeTexture = cubeLoad
    .setPath("image/sky/")
    .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

  const material = new THREE.MeshPhysicalMaterial({
    envMap: cubeTexture,
    // side: THREE.DoubleSide,
    roughness: 0,
    metalness: 1,
    // 1. 设置清漆度（0 - 1）
    clearcoat: 1,
    // 2. 设置清漆度的粗糙度
    clearcoatRoughness: 1,
  });

  const gui = new dat.GUI();
  gui.add(material, "roughness", 0, 1, 0.1);
  gui.add(material, "metalness", 0, 1, 0.1);
  gui.add(material, "clearcoat", 0, 1, 0.1);
  gui.add(material, "clearcoatRoughness", 0, 1, 0.1);

  scene.background = cubeTexture;

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// 创建灯光
function createLight() {
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 3, 3);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLightHelper(light, 1);
  scene.add(directionalLight);
}

initBase();
createLight();
