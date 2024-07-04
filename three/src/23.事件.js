// 目标: 点材质与点物体

import * as THREE from "three";

// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/addons/renderers/CSS3DRenderer.js";

// 导入性能监视器
import Stats from "three/examples/jsm/libs/stats.module";

//  全局声明 场景 , 摄像机 , 渲染器

let scene, camera, renderer, controls, cube;
let stats;
let labelRenderer;

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

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;
}

// 循环渲染方法
function renderLoop() {
  // 将场景与摄像机渲染到浏览器
  renderer.render(scene, camera);

  // 手动更新轨道控制器的场景
  controls.update();

  // 渲染3d文件
  labelRenderer.render(scene, camera);

  // 根据当前计算机浏览器刷新帧率（默认 60 ��/秒），不断递归调用此函数渲染最新的画面状态
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

// 创建全景贴图
function createMap() {
  // 创建球形缓冲几何体
  const sphereGeo = new THREE.SphereGeometry(1, 32, 16);

  // 创建纹理加载器
  const texture = new THREE.TextureLoader().load("/image/earth.png");

  // 创建材质
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // 添加到物体
  cube = new THREE.Mesh(sphereGeo, material);

  // 添加到场景
  scene.add(cube);
}

// 创建立方体贴图
function createCubeMap() {
  // 创建立方体图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 创建纹理加载器
  const imgUrlArr = [
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg",
  ];

  const texturlLoader = new THREE.TextureLoader();
  texturlLoader.setPath("image/park/");

  // 创建材质并贴图
  const materialArr = imgUrlArr.map((imgUrl) => {
    const texturl = texturlLoader.load(imgUrl);
    // threejs颜色通道设置rgb颜色(防止颜色太浅)
    texturl.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshBasicMaterial({
      map: texturl,
      side: THREE.DoubleSide,
    });
  });

  // 创建物体
  cube = new THREE.Mesh(geometry, materialArr);

  // 调整立方体沿着z轴做 -1 缩小(镜面反转)
  cube.scale.set(1, 1, -1);
  // 添加到场景
  scene.add(cube);
}

// 创建视频贴图
function createCubeVideo() {
  // 创建图形
  const geometry = new THREE.PlaneGeometry(1, 1);
  let flag = false;
  // 创建视频
  const video = document.createElement("video");
  video.src = "video/mouse_cat.mp4";
  video.muted = true; // 静音
  // 监听视频是否加载完成
  // video.addEventListener("loadedmetadata", () => {
  //   // 开始播放视频
  //   video.stop();
  // });

  // 创建按钮
  const btn = document.createElement("button");
  btn.innerHTML = "play";
  btn.style.position = "fixed";
  btn.style.right = "0";
  btn.style.top = "0";
  document.body.appendChild(btn);
  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });

  const btn1 = document.createElement("button");
  btn1.innerHTML = "play";
  btn1.style.position = "fixed";
  btn1.style.right = "100px";
  btn1.style.top = "0";
  document.body.appendChild(btn1);
  btn1.addEventListener("click", () => {
    if (flag) {
      video.pause();
      flag = false;
    } else {
      video.play();
      flag = true;
    }
    // flag ? video.pause() : video.play();
  });

  // 创建视频加载(视频加载器)(创建纹理)
  const videoTexture = new THREE.VideoTexture(video);

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
  });

  // 创建物体
  cube = new THREE.Mesh(geometry, material);

  // cube.scale.set(1, 1);

  // 加入场景
  scene.add(cube);
}

// 创建3D文本
function createDom3D() {
  // 1. 准备html元素
  const tag = document.createElement("span");
  tag.innerHTML = "我是文字,-前进";
  tag.style.color = "#fff";
  tag.addEventListener("click", (e) => {
    alert("123567");
    // 阻止事件冒泡
    e.stopPropagation();
  });

  // 2.转化为3d物体
  const tag3D = new CSS3DObject(tag);
  tag3D.scale.set(1 / 50, 1 / 50, 1 / 50);
  scene.add(tag3D);

  // 3. 进行渲染
  labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  // 在什么条件下让标签触发鼠标交互时间
  labelRenderer.domElement.style.pointerEvents = "none";

  labelRenderer.domElement.style.position = "fixed";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.left = "0";
  document.body.appendChild(labelRenderer.domElement);
}

// 创建物体
function createOneCude() {
  // 创建几何形(图形)
  const geometry = new THREE.BoxGeometry();

  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // 创建物体
  const cube = new THREE.Mesh(geometry, material);

  cube.name = "cube";

  // 添加到场景
  scene.add(cube);
}

// 设置物体事件
function bindClick() {
  window.addEventListener("click", () => {
    // 定义光线投射
    const raycaster = new THREE.Raycaster();
    // 定义二维向量对象(保存转化后的平面x, y坐标轴)
    const pointer = new THREE.Vector2();

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 更新摄像机和鼠标之前的连线
    raycaster.setFromCamera(pointer, camera);

    // 获取这条线穿过了哪些物体,收集成一个数组
    const list = raycaster.intersectObjects(scene.children);

    // console.log("list", list);
    list.forEach((item) => {
      console.log(item);
      if (item.object.name === "cube") {
        alert("123");
      }
    });
  });
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
// createAxesHelper();

// 调用创建物体方法
// createCube();
// createCircleCube();
// createPoint();
// createLine();
// createMap();
// createCubeMap();
// createCubeVideo();
createDom3D();
createOneCude();
bindClick();

// 调用场景适配方法
resizeRender();

// 调用创建性能监视器方法
createStats();

// 调用删除物体方法
removeCube();

// 调用循环渲染方法
renderLoop();
