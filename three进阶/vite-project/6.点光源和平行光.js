import * as THREE from "three";
import { scene } from "./utils/init";

// 创建物体
function createCube() {
  // 创建图形/几何体
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.MeshPhongMaterial({
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
  // 创建光源(环境光)
  // const light = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(light);

  // 创建光源(点光源)
  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // console.log("pointLight", pointLight);
  // pointLight.position.set(1, 1, 1);
  // scene.add(pointLight);

  // 创建光源辅助对象
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  // scene.add(pointLightHelper);

  // 创建光源(平行光)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  scene.position.set(2, 2, 2);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLightHelper(light, 1);
  scene.add(directionalLight);
}

createCube();
createLight();
