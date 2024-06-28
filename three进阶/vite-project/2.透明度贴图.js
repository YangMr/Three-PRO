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
  const alphaTexture = new THREE.TextureLoader().load(
    "texture/one/opacity.jpg"
  );
  alphaTexture.colorSpace = THREE.SRGBColorSpace;

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: alphaTexture,
    // 传入透明纹理对象
    alphaMap: alphaTexture,
    // 开启透明度材质
    transparent: true,
  });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);
  // 添加到场景中
  scene.add(mesh);
}

initBase();
