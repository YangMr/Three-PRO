// 目标：浏览器窗口，尺寸改变时，画布自适应

// 1. 创建适配函数，监听浏览器 resize 事件
// 2. 调整渲染器画布宽高，摄像机宽高比和更新视椎体空间
import * as THREE from "three";

// 1. 单独引入 OrbitControls 轨道控制器构造函数
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, controls;

// 初始化THREE三要素
function init() {
  // 2. 创建场景对象
  scene = new THREE.Scene();

  // 3. 创建摄像机对象
  //   参数1：垂直角度（建议 75），视野范围
  //   参数2：宽高比（建议与画布相同宽高），物体绘制比例
  //   参数3：近截面距离摄像机距离
  //   参数4：远截面距离摄像机距离
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 4. 创建渲染器，并设置画布大小，添加到 DOM 显示 canvas
  renderer = new THREE.WebGLRenderer();

  // 5. 设置画布大小, 画布的大小为浏览器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 6. 添加到 DOM 显示, (将canvas添加到body中)
  document.body.append(renderer.domElement);
}

// 创建立方体
function createCube() {
  // 1. 创建图形，宽高深为 1 单位（立方缓冲几何体）
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 2. 创建材质，颜色为绿色 0x00ff00 （网格基础材质-线面纯颜色描绘表面）
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // 3. 创建网格物体对象，传入图形和材质
  const mesh = new THREE.Mesh(geometry, material);

  // 4.把物体对象添加到场景
  scene.add(mesh);
}

// 创建轨道控制器
function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);

  //  阻尼效果
  controls.enableDamping = true;

  // 2. 开启自动旋转轨道控制器效果->带动摄像机一起旋转（摄像机顺时针水平旋转）
  controls.autoRotate = true;
  controls.autoRotateSpeed = 10;

  // 水平角度范围控制
  // controls.maxAzimuthAngle = 1.5 * Math.PI;
  // controls.minAzimuthAngle = 0.1 * Math.PI;

  // // 垂直角度范围控制
  // controls.maxPolarAngle = Math.PI;
  // controls.minPolarAngle = 0;

  // //  摄像机移动范围控制
  // controls.minDistance = 2;
  // controls.maxDistance = 10;
}

// 循环渲染方法
function renderLoop() {
  // 在渲染循环中更新场景渲染
  renderer.render(scene, camera);

  // 手动 JS 代码更新过摄像机信息，必须调用轨道控制器 update 方法
  controls.update();

  // 根据当前计算机浏览器刷新帧率（默认 60 次/秒），不断递归调用此函数渲染最新的画面状态
  // 好处：当前页面切换到后台，暂停递归
  requestAnimationFrame(renderLoop);
}

// 创建坐标轴
function createAxesHelper() {
  const axesHelper = new THREE.AxesHelper(10);

  // 将坐标轴添加场景中
  scene.add(axesHelper);
}

// 调用初始化三要素的方法
init();

// 调用创建物体的方法
createCube();

// 调用创建轨道控制器你发个发
createControls();

// 调用创建坐标轴
createAxesHelper();

// 调用循环渲染方法
renderLoop();
