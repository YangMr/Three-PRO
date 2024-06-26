// 目标: 点材质与点物体

import * as THREE from "three";

// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 导入性能监视器
import Stats from "three/examples/jsm/libs/stats.module";

//  全局声明 场景 , 摄像机 , 渲染器

let scene, camera, renderer, controls, cube;
let stats;

// 创建分组
const group = new THREE.Group();

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

  camera.position.z = 10;

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

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;
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
    // 创建图形
    const geometry = new THREE.BoxGeometry(cubeObj.w, cubeObj.h, cubeObj.d);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: cubeObj.color });

    // 创建物体
    cube = new THREE.Mesh(geometry, material);
    cube.name = "cube";

    // 设置物体的位置
    cube.position.set(cubeObj.x, cubeObj.y, cubeObj.z);

    // 将物体添加到分组中
    group.add(cube);
  });

  // 将分组添加到场景中
  scene.add(group);

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

// 创建球体
function createCircleCube() {
  // 图形(几何体)
  const sphereGeo = new THREE.SphereGeometry(1, 32, 19); // 球体

  // 平面缓冲几何体
  const planeGeo = new THREE.PlaneGeometry(1, 1);

  // 圆形缓冲几何体
  const circleGeo = new THREE.CircleGeometry(5, 32);

  // 材质
  const sphere = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  const plain = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  });
  const circle = new THREE.MeshBasicMaterial({
    color: "purple",
    side: THREE.DoubleSide,
  });

  // 物体
  const cube1 = new THREE.Mesh(sphereGeo, sphere);
  cube1.position.set(-1, -1, -1);
  const cube2 = new THREE.Mesh(planeGeo, plain);
  cube2.position.set(20, 20, 20);
  const cube3 = new THREE.Mesh(circleGeo, circle);
  cube3.position.set(-30, -5, 30);

  // 添加到场景
  scene.add(cube1);
  scene.add(cube2);
  scene.add(cube3);
}

// 使用点材质与点物体
function createPoint() {
  // 创建图形
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.PointsMaterial({ color: 0x6600fff, size: 0.05 });

  // 创建物体
  const cube = new THREE.Points(geometry, material);

  // 添加到场景
  scene.add(cube);
}

// 使用线材质与线物体
function createLine() {
  const points = [];

  points.push(new THREE.Vector3(-1, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));

  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(1, 1, 1));
  // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // 创建材质
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // 创建物体
  const line = new THREE.LineLoop(geometry, material);

  scene.add(line);
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

// 删除物体
function removeCube() {
  window.addEventListener("dblclick", () => {
    group.children.map((obj) => {
      // 处理图形占用的内存
      obj.geometry.dispose();
      // 处理材质占用的内存
      obj.material.dispose();
      // 分组中移除物体
      group.remove(obj);
    });

    scene.remove(group);
    // const arr = scene.children.filter((obj) => obj.name === "cube");
    // const cube = arr[0];
    // if (cube) {
    //   // 处理图形占用的内存
    //   cube.geometry.dispose();
    //   // 处理材质占用的内存
    //   cube.material.dispose();
    //   // 从场景中移除物体
    //   scene.remove(cube);
    // }
  });
}

// 调用初始化three三要素
init();

// 调用创建轨道控制器
createControls();

// 调用创建坐标轴方法
createAxesHelper();

// 调用创建物体方法
// createCube();
// createCircleCube();
// createPoint();
createLine();

// 调用场景适配方法
resizeRender();

// 调用创建性能监视器方法
createStats();

// 调用删除物体方法
removeCube();

// 调用循环渲染方法
renderLoop();
