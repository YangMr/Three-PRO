// 目标：向场景中加入一个立方体物体，了解基于 three.js 如何创建一个 3D 物体

// 过程:
// 1.创建图形,宽高深为 1 单位
// 2.创建材质，颜色为绿色 0x00ff00
// 3.创建网格物体对象，传入图形和材质
// 4.把物体对象添加到场景
// 注意1：摄像机需要拉远一些才能看到物体
// 注意2：渲染器需要调用 render 才能渲染画面（等待物体添加到场景后，再调用）

// 1. 下载并引入three
import * as THREE from "three";

let scene, camera, renderer;

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
  camera.position.z = 10;

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
  const material = new THREE.MeshBasicMaterial({ color: "red" });

  // 3. 创建网格物体对象，传入图形和材质
  const mesh = new THREE.Mesh(geometry, material);

  // 4.把物体对象添加到场景
  scene.add(mesh);
}

// 调用初始化三要素的方法
init();

// 调用创建物体的方法
createCube();

// 7. 将场景与相机添加到渲染器 (将场景与相机添加到canvas)
renderer.render(scene, camera);
