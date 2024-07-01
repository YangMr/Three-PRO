import * as THREE from "three";
import { scene, renderer } from "./utils/init";

import gsap from "gsap";

// createCube();
// createLight();

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

renderer.shadowMap.enabled = true;
createFloor();
createSphereBufferGeometry();
createLight1();

initAnimate();
