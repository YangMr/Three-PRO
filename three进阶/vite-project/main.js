// 目标: 基础网格材质 - 颜色贴图

import * as THREE from "three";
import { scene } from "./utils/init";

// 模拟加载器
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

  const alphaTexture = new THREE.TextureLoader().load(
    "texture/one/opacity.jpg"
  );

  const aoTexture = new THREE.TextureLoader().load(
    "texture/one/ambientOcclusion.jpg"
  );
  aoTexture.colorSpace = THREE.SRGBColorSpace;

  // 创建材质
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    aoMap: aoTexture,
    shininess: 100,
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
  const direction = new THREE.DirectionalLight(0xffffff, 2);
  direction.position.set(3, 3, 3);
  scene.add(direction);

  // 平行光辅助对象
  // 参数1：平行光对象，参数2：模拟平行光光源的大小
  const helper = new THREE.DirectionalLightHelper(direction, 1);
  scene.add(helper);
}

let cube;
// 加载模型
function loadModel() {
  // 初始化模型加载器
  const loader = new GLTFLoader();
  // 加载模型
  loader.load("model/office.gltf", (gltf) => {
    console.log("gltf", gltf);
    // 取出模型
    const model = gltf.scene;

    // 获取当前模型中所有的子模型
    // model.traverse((obj) => {
    //   // console.log("obj=>", obj);
    //   if (obj.name === "Object_3") {
    //     console.log("objaa", obj);
    //     cube = obj;
    //   }
    // });

    //将模型添加到场景之中
    scene.add(model);
  });
}

function createDomButton() {
  const btn = document.createElement("button");
  btn.innerHTML = "red";
  btn.style.position = "fixed";
  btn.style.top = "20px";
  btn.style.left = "20px";
  btn.addEventListener("click", () => {
    changeColor("red");
  });

  const btn1 = document.createElement("button");
  btn1.innerHTML = "yellow";
  btn1.style.position = "fixed";
  btn1.style.top = "20px";
  btn1.style.left = "80px";
  btn1.addEventListener("click", () => {
    changeColor("yellow");
  });
  document.body.appendChild(btn);
  document.body.appendChild(btn1);
}

createDomButton();

function changeColor(color) {
  cube.material = new THREE.MeshPhongMaterial({
    color,
  });
}

// initBase();
createLight();
loadModel();
