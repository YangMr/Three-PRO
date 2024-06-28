// 目标: 基础网格材质 - 颜色贴图

import * as THREE from "three";
import { scene } from "./utils/init";

// 颜色贴图
function initBase() {
  // 创建几何体
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 纹理加载器
  // const textureLoader = new THREE.TextureLoader();
  // const texture = textureLoader.load("texture/one/opacity.jpg");
  // texture.colorSpace = THREE.SRGBColorSpace;
  // const alphaTexture = new THREE.TextureLoader().load(
  //   "texture/one/opacity.jpg"
  // );
  // alphaTexture.colorSpace = THREE.SRGBColorSpace;

  const texture = new THREE.TextureLoader().load("texture/one/basecolor.jpg");

  // 创建材质
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    // 设置环境遮挡贴图
  });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);
  // 添加到场景中
  scene.add(mesh);
}

// 创建灯光
function createLight() {
  // 环境光: 无方向, 照亮场景中所有受光照影响的物体
  // const light = new THREE.AmbientLight("0Xffffff");
  // light.position.set(3, 3, 3);
  // scene.add(light);

  // 平行光：从一个方向发射过来平行光线
  const direction = new THREE.DirectionalLight("0Xffffff", 2);
  direction.position.set(3, 3, 3);
  scene.add(direction);

  // 平行光辅助对象
  // 参数1：平行光对象，参数2：模拟平行光光源的大小
  const helper = new THREE.DirectionalLightHelper(direction, 1);
  scene.add(helper);
}

initBase();
createLight();
