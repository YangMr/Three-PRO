import "./style.css";
import * as THREE from "three";
import { scene, camera } from "./utils/init";

import dat from "dat.gui";

const sceneInfoObj = {
  one: {
    publicPath: "technology/1/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [-0.46, -0.11, -0.11],
        rotation: [1.42, 0.68, 1.63],
        targerAttr: "two",
      },
    ],
  },
  two: {
    publicPath: "technology/2/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [0.47, -0.2, 0],
        rotation: [1.48, 0.26, -1.78],
        targerAttr: "one",
      },
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [-0.46, -0.16, -0.3],
        rotation: [1.21, 0.78, 0],
        targerAttr: "three",
      },
    ],
  },
};

// 创建组
const group = new THREE.Group();

// 创建立方缓冲几何体
function createCube() {
  // 创建图形(几何体)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  // 创建物体
  const cube = new THREE.Mesh(geometry, material);
  // 镜面反转
  cube.scale.set(1, 1, -1);
  // 添加到场景
  scene.add(cube);

  return cube;
}

// 设置材质进行贴图
function setMaterialCube(infoObj) {
  // 清除上一个场景的标记点

  const { publicPath, imgUrlArr, markList } = infoObj;

  // 创建图片纹理加载器
  const textureLoader = new THREE.TextureLoader();
  textureLoader.colorSpace = THREE.SRGBColorSpace;
  // 设置公共的图片路径
  textureLoader.setPath(publicPath);
  // 遍历所有的图片进行加载
  const materialArr = imgUrlArr.map((imgStr) => {
    const texture = textureLoader.load(imgStr);

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
  });

  // 重新设置修改后的物体材质
  cubeObj.material = materialArr;

  markList.forEach((markObj) => {
    if (markObj.name === "landMark") {
      // 调用创建标记点方法
      createLandMark(markObj);
    }
  });

  // 添加到场景中
  scene.add(group);
}

// 创建标记点
function createLandMark(markObj) {
  const { wh, imgUrl, position, rotation, targerAttr } = markObj;

  // 创建几何体(图形)
  const geometry = new THREE.PlaneGeometry(...wh);
  // 创建图片纹理加载器
  const texture = new THREE.TextureLoader().load(imgUrl);

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);

  // 设置位移
  mesh.position.set(...position);
  // 设置宣战
  mesh.rotation.set(...rotation);

  // 标记点贴图
  mesh.name = "mark";

  mesh.userData.attr = targerAttr;

  // createGui(mesh);
  // 标记点添加到组
  group.add(mesh);
}

// 创建物体的事件
function bindClick() {
  window.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);

    // 获取射线穿过的物体
    const list = raycaster.intersectObjects(scene.children);

    list.forEach((mesh) => {
      if (mesh.object.name === "mark") {
        const infoObj = sceneInfoObj[mesh.object.userData.attr];
        setMaterialCube(infoObj);
      }
    });
  });
}

let cubeObj = createCube();

setMaterialCube(sceneInfoObj.one);

bindClick();

function createGui(m) {
  // 创建dat.GUI实例

  const gui = new dat.GUI();

  gui.add(m.position, "x", -1, 2).step(0.01);
  gui.add(m.position, "y", -1, 2).step(0.01);
  gui.add(m.position, "z", -1, 2).step(0.01);
  gui.add(m.rotation, "x", -1, 2).step(0.01);
  gui.add(m.rotation, "y", -1, 2).step(0.01);
  gui.add(m.rotation, "z", -1, 2).step(0.01);
}
