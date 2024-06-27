// 封装初始化内容(三要素, 轨道控制器, 坐标轴、场景适配、文本3d渲染 、 循环渲染)

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export let scene, camera, renderer, controls, css3dRenderer;

// 三要素
(function init() {
  // 创建场景
  scene = new THREE.Scene();
  // 创建摄像机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 0.1;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 添加到dom中
  document.body.appendChild(renderer.domElement);
})();

// 轨道控制器
(function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);

  // TODO:水平旋转的角度

  controls.enableZoom = false;
})();

// 坐标轴
(function createAxes() {
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
})();

// 场景适配
(function resizeRender() {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// 将文本渲染为3D
(function create3DRenderer() {
  css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.domElement.style.position = "fixed";
  css3dRenderer.domElement.style.top = 0;
  css3dRenderer.domElement.style.left = 0;
  css3dRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(css3dRenderer.domElement);
})();

// 循环渲染
(function renderLoop() {
  renderer.render(scene, camera);
  css3dRenderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(renderLoop);
})();
