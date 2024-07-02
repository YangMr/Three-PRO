import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { loadManager } from "../model/loadManager";
import { MyCar } from "@/model/Car";
import { MyLight } from "@/effect/MyLight";
import { MySky } from "@/effect/MySky";

export let scene, camera, renderer, controls;

// app区域就是threejs渲染的区域
const app = document.querySelector(".app");

// 初始化三要素
function init() {
  // 初始化场景
  scene = new THREE.Scene();
  // 初始化摄像机
  camera = new THREE.PerspectiveCamera(
    75,
    app.clientWidth / app.clientWidth,
    0.1,
    1000
  );

  camera.position.z = 1;

  // 创建渲染器(画布) antialias:true 开启抗锯齿
  renderer = new THREE.WebGLRenderer({ antialias: true });

  // 开启阴影渲染
  renderer.shadowMap.enabled = true;

  // 设置画布大小
  renderer.setSize(app.clientWidth, app.clientHeight);

  // 将画布渲染到app区域
  app.appendChild(renderer.domElement);

  // 加载汽车模型
  loadManager("glb/Lamborghini.glb").then((model) => {
    // 将汽车渲染到场景中
    new MyCar(model, scene, camera, controls);

    // 将灯光渲染到场景中
    new MyLight(scene);

    // 渲染展厅场景
    new MySky(scene);
  });
}

// 创建轨道控制器
function createOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableDamping = true; // 阻尼效果，让物体在转动时速度慢下来
  //   controls.dampingFactor = 0.25; // 阻尼系数，值越小，阻尼越明显
  //   controls.enableZoom = true; // 开启缩放
  //   controls.enablePan = false; // 开启平移
}

// 创建坐标轴
function createHelper() {
  const axesHelper = new THREE.AxesHelper(10);
  // scene.add(axesHelper);
}

// 场景适配(自适应)
function resizeRender() {
  window.addEventListener("resize", () => {
    renderer.setSize(app.clientWidth, app.clientHeight);
    camera.aspect = app.clientWidth / app.clientHeight;
    camera.updateProjectionMatrix();
  });
}

// 循环渲染
function renderLoop() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(renderLoop);
}

// 启动方法
function start() {
  init();
  createOrbitControls();
  createHelper();
  resizeRender();
  renderLoop();
}

start();
