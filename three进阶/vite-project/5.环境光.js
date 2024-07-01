import * as THREE from "three";
import { scene } from "./utils/init";

// 创建物体
function createCube() {
  // 创建图形/几何体
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  // 创建物体
  const cube = new THREE.Mesh(geometry, material);
  // 添加到场景
  scene.add(cube);
}

// 创建光源
function createLight() {
  // 创建光源(环境官)
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
}

createCube();
// createLight();
