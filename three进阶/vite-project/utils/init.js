// 初始化 three.js 基础环境
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export let scene, camera, renderer, controls;

// 初始化三要素
(function init() {
  // 场景
  scene = new THREE.Scene();
  // 摄像机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置摄像机组z轴位置
  camera.position.set(0, 0, 5);
  // 创建渲染器(创建画布)
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置画布大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 添加到dom
  app.appendChild(renderer.domElement);
})();

// 创建轨道控制器
(function createControls() {
  // 初始化轨道控制器, 将摄像机与画布添加到轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  // 禁止方法或缩小
  controls.enableDamping = true;
})();

// 创建坐标轴
(function createHelper() {
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
})();

// 自适应
(function resizeRender() {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();

//
(function renderLoop() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(renderLoop);
})();
