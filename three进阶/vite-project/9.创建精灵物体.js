// 目标：使用 three.js 中的精灵物体
// 精灵物体：一个总面朝着摄像机的平面，通常使用一个半透明的纹理
// 使用：
// 1. 准备纹理对象并加载图片素材
// 2. 使用 SpriteMaterial 精灵材质
// 3. 使用 Sprite 创建精灵物体并加入场景

// 区别：
// CSS3D：始终不面向摄像机，场景缩放时跟随着变大/变小，不被模型遮挡，通过 DOM 事件点击
// CSS2D：始终面向摄像机，  场景缩放时不跟随变化，     不被模型遮挡，通过 DOM 事件点击
// 精灵体：始终面向摄像机，  场景缩放时跟随着变大/变小，被模型遮挡，  通过光射投影交互
// 平面体：始终不面向摄像机，场景缩放时跟随着变大/变小，被模型遮挡，  通过光射投影交互

import * as THREE from "three";
import { scene, renderer } from "./utils/init";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

import gsap from "gsap";

// 创建平面
function createFloor() {
  // 创建图形
  const geometry = new THREE.PlaneGeometry(3, 3);
  // 创建材质
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  // 创建物体
  const plain = new THREE.Mesh(geometry, material);

  plain.rotation.set(-Math.PI / 2, 0, 0);
  // 接受阴影
  plain.receiveShadow = true;

  // 添加到场景
  scene.add(plain);
}

let mesh;

// 创建球形缓冲几何体
function createSphereBufferGeometry() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}

// 创建光源
let spotLight;
function createLight1() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  spotLight = new THREE.DirectionalLightHelper(light, 1);
  scene.add(spotLight);
}

// 动画方法
function initAnimate() {
  const aniObj = gsap.to(mesh.position, {
    x: 5, // 对参数 1 目标对象做什么属性的变化
    duration: 3, // 动画持续时间
    delay: 2, // 延迟 2 秒后在做当前动画
    repeat: -1, // 无限次反复运动
    yoyo: true, // 回到原点过程也有一个动画
    ease: "expo.out", // 设置缓冲效果（参考： https://greensock.com/docs/v3/Eases）调整使用的内置字符串模式
    onStart() {
      console.log("开始动画");
    },
    onUpdate() {
      console.log("动画更新");
      spotLight.update(); // 让平行光辅助对象可以实时更新角度和射线
    },
    onComplete() {
      console.log("动画结束");
    },
  });

  window.addEventListener("dblclick", () => {
    if (aniObj.isActive()) {
      // 当前动画运行中为 true
      aniObj.pause();
    } else {
      // 暂停->恢复
      aniObj.resume();
    }
  });
}

// 创建2d物体
function create2d() {
  const div = document.createElement("div");
  div.innerHTML = "物体";
  div.style.color = "red";
  div.style.fontSize = "32px";

  const object2d = new CSS2DObject(div);
  object2d.position.set(0, 3, 0);
  scene.add(object2d);
}

// 创建精灵物体
function createSprite() {
  // 1. 准备纹理对象加载图片素材
  const texture = new THREE.TextureLoader().load("image/pkq.jpg");

  // 2. 创建 SpriteMaterial 材质
  const material = new THREE.SpriteMaterial({ map: texture });

  // 3. 创建 Sprite 创建精灵物体并加入场景
  const sprite = new THREE.Sprite(material);

  // 5. 设置精灵物体展示的坐标
  sprite.position.set(3, 0.5, -3);

  // 4. 添加到场景
  scene.add(sprite);
}

// 创建精灵物体
function createSprite1() {
  // 1. 准备纹理对象加载图片素材
  const texture = new THREE.TextureLoader().load("image/pkq.jpg");

  // 2. 创建 SpriteMaterial 材质
  const material = new THREE.SpriteMaterial({ map: texture });

  // 3. 创建 Sprite 创建精灵物体并加入场景
  const sprite = new THREE.Sprite(material);

  // 5. 设置精灵物体展示的坐标
  sprite.position.set(6, -0.5, 3);

  // 4. 添加到场景
  scene.add(sprite);
}

createSprite1();

renderer.shadowMap.enabled = true;
createFloor();
createSphereBufferGeometry();
createSprite();
create2d();
createLight1();

initAnimate();
