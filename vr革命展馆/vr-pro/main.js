import "./style.css";
import * as THREE from "three";
import { scene } from "./utils/init";

const sceneInfoObj = {
  one: {
    publicPath: "technology/1/",
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
  },
};

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
  const { publicPath, imgUrlArr } = infoObj;

  // 创建图片纹理加载器
  const textureLoader = new THREE.TextureLoader();
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

  // 添加到场景中
  scene.add(cubeObj);
}

let cubeObj = createCube();
setMaterialCube(sceneInfoObj.one);
