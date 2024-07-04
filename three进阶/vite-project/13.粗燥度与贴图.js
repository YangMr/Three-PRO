// 目标：标准网格材质 - 粗糙度和贴图
// 定义：一种基于物理渲染（PBR）的标准材质
// 作用：除了比前两种材质受光照影响外，可以设置粗糙度
// 使用：替换网格材质的构造函数为 MeshStandardMaterial
// 粗糙度贴图原理：黑色（光滑，高光），白色（粗糙，不反光，散射）

import { scene } from "./utils/init";
import * as THREE from "three";

// 创建物体
function initBase() {
  // 1. 创建球形缓存几何体
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  const base = new THREE.TextureLoader().load("texture/one/basecolor.jpg");
  base.colorSpace = THREE.SRGBColorSpace;

  const texture = new THREE.TextureLoader().load("texture/one/metalness.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshStandardMaterial({
    map: base,
    side: THREE.DoubleSide,
    // 粗糙度设置（0 光滑， 1 粗糙）
    // roughness: 1,
    // roughnessMap: texture,
    metalness: 1, // 金属度（光反射的光泽程度，1 是最高）
    metalnessMap: texture, // 金属度贴图
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// 创建灯光
function createLight() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 3, 3);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLightHelper(light, 1);
  scene.add(directionalLight);
}

initBase();
createLight();
