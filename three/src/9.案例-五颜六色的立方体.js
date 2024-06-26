// 目标: 绘制6个面颜色不同的立方体

import * as THREE from "three";

// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//  全局声明 场景 , 摄像机 , 渲染器

let scene, camera, renderer, controls, cube;

// 初始化three三要素
function init() {
  // 创建场景
  scene = new THREE.Scene();

  // 创建摄像机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  // 设置画布的大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 添加到 DOM 显示, (将canvas添加到body中)
  document.body.append(renderer.domElement);
}

// 创建轨道控制器
function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);
}

// 循环渲染方法
function renderLoop() {
  // 将场景与摄像机渲染到浏览器
  renderer.render(scene, camera);

  // 手动更新轨道控制器的场景
  controls.update();

  // 根据当前计算机浏览器刷新帧率（默认 60 次/秒），不断递归调用此函数渲染最新的画面状态
  requestAnimationFrame(renderLoop);
}

// 创建坐标轴
function createAxesHelper() {
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

// 场景适配
function resizeRender() {
  window.addEventListener("resize", () => {
    // 调整渲染器画布宽高
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 摄像机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机视椎体空间
    camera.updateProjectionMatrix();
  });
}

// 创建物体
function createCube() {
  // 创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 定义立方体六个面的颜色 x正负 y正负 z正负
  const colorArr = ["red", "green", "blue", "yellow", "pink", "purple"];

  // 创建材质 每个颜色字符映射材质对象
  // const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  const material = colorArr.map((item) => {
    return new THREE.MeshBasicMaterial({ color: item });
  });
  // 创建物体
  cube = new THREE.Mesh(geometry, material);
  // 将物体添加到场景中
  scene.add(cube);
}

// 调用初始化three三要素
init();

// 调用创建轨道控制器
createControls();

// 调用创建坐标轴方法
createAxesHelper();

// 调用创建物体方法
createCube();

// 调用场景适配方法
resizeRender();

// 调用循环渲染方法
renderLoop();
