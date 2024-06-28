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

  const aoTexture = new THREE.TextureLoader().load(
    "texture/one/ambientOcclusion.jpg"
  );

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: aoTexture,
    // 设置环境遮挡贴图
    aoMap: aoTexture,
  });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);
  // 添加到场景中
  scene.add(mesh);
}

initBase();
