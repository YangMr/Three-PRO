// 目标：three.js 三要素 (场景 摄像机 渲染器)
// 1. 下载并引入 three 库 npm i three
// 2. 创建场景对象
// 3. 创建摄像机对象
// 参数1：垂直角度（建议 75），视野范围
// 参数2：宽高比（建议与画布相同宽高），物体绘制比例
// 参数3：近截面距离摄像机距离
// 参数4：远截面距离摄像机距离
// 4. 创建渲染器，并设置画布大小，添加到 DOM 显示

// 1. 下载并引入three
import * as THREE from "three";

let scene, camera, renderer;

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

  // 4. 创建渲染器，并设置画布大小，添加到 DOM 显示 canvas
  renderer = new THREE.WebGLRenderer();

  // 5. 设置画布大小, 画布的大小为浏览器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 6. 添加到 DOM 显示, (将canvas添加到body中)
  document.body.append(renderer.domElement);

  // 7. 将场景与相机添加到渲染器 (将场景与相机添加到canvas)
  renderer.render(scene, camera);
}

init();
