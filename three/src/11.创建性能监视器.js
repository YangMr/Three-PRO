// 目标: 创建性能监视器

import * as THREE from "three";

// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 导入性能监视器
import Stats from "three/examples/jsm/libs/stats.module";

//  全局声明 场景 , 摄像机 , 渲染器

let scene, camera, renderer, controls, cube;
let stats;

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

  // 性能监视器数据循环更新
  stats.update();
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
  const cubeInfoArr = [];

  for (let i = 0; i < 10; i++) {
    // 创建数据
    const cubeObject = {
      // 颜色
      color: `rgb(${Math.floor(Math.random() * (255 - 0 + 1))}, ${Math.floor(
        Math.random() * (255 - 0 + 1)
      )},${Math.floor(Math.random() * (255 - 0 + 1))})`,

      // 宽
      w: Math.floor(Math.random() * (3 - 1 + 1) + 1),

      // 高
      h: Math.floor(Math.random() * (3 - 1 + 1) + 1),

      // 长
      d: Math.floor(Math.random() * (3 - 1 + 1) + 1),

      // x
      x: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      // y
      y: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      // z
      z: Math.floor(Math.random() * (5 - -5 + 1) + -5),
    };
    cubeInfoArr.push(cubeObject);
  }

  cubeInfoArr.map((cubeObj) => {
    console.log("cubeObj", cubeObj);
    // 创建图形
    const geometry = new THREE.BoxGeometry(cubeObj.w, cubeObj.h, cubeObj.d);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: cubeObj.color });

    // 创建物体
    cube = new THREE.Mesh(geometry, material);

    // 设置物体的位置
    cube.position.set(cubeObj.x, cubeObj.y, cubeObj.z);

    // 场景
    scene.add(cube);
  });

  // 创建图形
  // const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 定义立方体六个面的颜色 x正负 y正负 z正负
  // const colorArr = ["red", "green", "blue", "yellow", "pink", "purple"];

  // 创建材质
  // const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  // const material = colorArr.map((item) => {
  //   return new THREE.MeshBasicMaterial({ color: item });
  // });
  // 创建物体
  // cube = new THREE.Mesh(geometry, material);
  // 将物体添加到场景中
  // scene.add(cube);
}

// 创建性能监视器
function createStats() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.domElement.style.position = "fixed";
  stats.domElement.style.left = "0";
  stats.domElement.style.top = "0";
  document.body.appendChild(stats.domElement);
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

// 调用创建性能监视器方法
createStats();

// 调用循环渲染方法
renderLoop();
