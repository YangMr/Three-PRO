import "./style.css";
import * as THREE from "three";
import { scene, camera } from "./utils/init";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import createGui from "./utils/gui";

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
  three: {
    publicPath: "technology/3/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [0.4, -0.18, 0.32],
        rotation: [-1.53, -0.04, -1.26],
        targerAttr: "two",
      },
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [0.32, -0.16, -0.33],
        rotation: [1.46, 0.1, -0.17],
        targerAttr: "four",
      },
    ],
  },
  four: {
    publicPath: "technology/4/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [-0.35, -0.22, 0.4],
        rotation: [-0.85, -0.45, -1.8],
        targerAttr: "three",
      },
      {
        name: "dom",
        targerAttr: "five",
        position: [0.49, 0, 0],
        rotation: [0, -0.5 * Math.PI, 0],
        active: (e) => {
          setMaterialCube(sceneInfoObj.five);
          e.stopPropagation();
        },
      },
    ],
  },
  five: {
    publicPath: "technology/5/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [0, -0.18, 0.4],
        rotation: [0, 0, 0],
        targerAttr: "four",
      },
      {
        name: "video",
        imgUrl: "video/movie.mp4",
        wh: [0.2, 0.1],
        position: [0.49, 0.04, 0.045],
        rotation: [0, -0.5 * Math.PI, 0],
      },
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [-0.42, -0.19, -0.23],
        rotation: [1.66, -0.29, 0.49],
        targerAttr: "sex",
      },
    ],
  },
  sex: {
    publicPath: "technology/6/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [0, -0.18, 0.4],
        rotation: [0, 0, 0],
        targerAttr: "five",
      },
      {
        name: "video",
        imgUrl: "video/movie.mp4",
        wh: [0.2, 0.1],
        position: [0.49, 0.04, 0.045],
        rotation: [0, -0.5 * Math.PI, 0],
      },
      {
        name: "landMark",
        imgUrl: "other/landmark.png",
        wh: [0.05, 0.05],
        position: [-0.42, -0.19, -0.23],
        rotation: [1.66, -0.29, 0.49],
        targerAttr: "seven",
      },
    ],
  },
  seven: {
    publicPath: "technology/7/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
  },
};

// 创建组
const group = new THREE.Group();

// 清除标记点
function clear() {
  // 获取组中所有的物体
  const list = [...group.children];
  list.forEach((item) => {
    if (!item.isObject3D) {
      // 清除图形
      item.geometry.dispose();
      // 清除材质
      item.material.dispose();
    }

    // 组中移除这个元素
    group.remove(item);
  });
}

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
  clear();

  const { publicPath, imgUrlArr, markList } = infoObj;

  // 创建图片纹理加载器
  const textureLoader = new THREE.TextureLoader();

  // 设置公共的图片路径
  textureLoader.setPath(publicPath);
  // 遍历所有的图片进行加载
  const materialArr = imgUrlArr.map((imgStr) => {
    const texture = textureLoader.load(imgStr);
    texture.colorSpace = THREE.SRGBColorSpace;
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
    } else if (markObj.name === "dom") {
      createDomMark(markObj);
    } else if (markObj.name === "video") {
      createVideoMap(markObj);
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

  createGui(mesh);
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
      } else if (mesh.object.name === "video") {
        // console.log("mesh.attr", mesh.attr);
        playPauseVideo(video);
      }
    });
  });
}

// 将dom元素转化为3d
function createDomMark(markObj) {
  const { position, name, rotation, active } = markObj;

  // 创建dom元素
  const tag = document.createElement("span");
  tag.innerHTML = "前进";
  tag.className = "mark-style";
  tag.style.pointerEvents = "none";
  tag.addEventListener("click", (e) => {
    active(e);
  });

  // 将dom元素转换为3d
  const tag3d = new CSS3DObject(tag);
  tag3d.scale.set(1 / 800, 1 / 800, 1 / 800);
  tag3d.position.set(...position);
  tag3d.rotation.set(...rotation);
  tag3d.name = name;
  group.add(tag3d);
}
let video;
// 创建视频贴图
function createVideoMap(markObj) {
  const { wh, imgUrl, position, rotation, name } = markObj;
  // 创建图形
  const geometry = new THREE.PlaneGeometry(...wh);

  video = document.createElement("video");
  video.src = imgUrl;
  video.muted = true;
  // video.addEventListener("loadeddata", () => {
  //   video.play();
  // });

  const videoTexture = new THREE.VideoTexture(video);

  // 创建材质
  const material = new THREE.MeshBasicMaterial({ map: videoTexture });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;

  mesh.position.set(...position);
  mesh.rotation.set(...rotation);

  // 添加组
  group.add(mesh);
}

// 播放与暂停的方法
function playPauseVideo(video) {
  if (video.paused) {
    video.play();
    video.muted = false;
  } else {
    video.pause();
    video.muted = true;
  }
}

let cubeObj = createCube();

setMaterialCube(sceneInfoObj.one);

bindClick();
