// 目标：立方体类 MyCube 的创建与应用
// 1. 定义 MyCube 类以及属性和方法
// 2. 循环创建 5 个立方体并出现在三维空间中

import * as THREE from "three";
import { scene } from "./utils/init";

// 1. 定义 MyCube 类以及属性和方法

class MyCube {
  constructor(scene) {
    // 设置颜色
    this.color = new THREE.Color(
      `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`
    );

    // 设置大小
    this.size = [
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
    ];

    // 设置位置
    this.postion = [
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
    ];

    this.scene = scene;
    this.init();
  }

  init() {
    // 1. 创建图像(几何体)
    const geometry = new THREE.BoxGeometry(...this.size);

    // 2. 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: this.color, // 随机生成一个 0xFFFFFF 类型的 RGB 值作为立方体的颜色
    });

    // 3. 创建物体
    const mesh = new THREE.Mesh(geometry, material);

    // 6. 设置物体的位置
    mesh.position.set(...this.postion);

    // 4. 添加到场景中
    this.scene.add(mesh);

    // 5. 将创建的物体交给变量保存
    this.model = mesh;
  }

  // 随机换色的方法
  randColor() {
    this.model.material.color = new THREE.Color(
      `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`
    );

    return this;
  }

  // 随机旋转
  randRotate() {
    this.model.rotation.set(
      0,
      Math.PI / Math.floor(Math.random() * (4 - 1 + 1) * 1),
      0
    );

    return this;
  }
}

console.log("new", new MyCube(scene));
const arr = [];
for (let i = 0; i < 5; i++) {
  arr.push(new MyCube(scene));
}

window.addEventListener("dblclick", () => {
  console.log("arr", arr);
  arr.forEach((item) => {
    item.randColor().randRotate();
  });
});
