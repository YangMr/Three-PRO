// 目标：创建 MySphere 类，并创建 5 个球体
// 1. 创建 BaseModel 提取公共属性和方法
// 2. 修改 MyCube 类继承自 BaseModal 类
// 3. 创建 MySphere 类并实例化 5 个球体

import { scene } from "./utils/init";
import * as THREE from "three";

// 1. 创建 BaseModel 提取公共属性和方法

class BaseModal {
  constructor(scene) {
    // 用来保存创建的物体
    this.model = null;

    // 保存创建的场景
    this.scene = scene;

    // 创建颜色
    this.color = new THREE.Color(
      `rgb(${Math.floor(Math.random() * (256 - 1 + 1) + 0)},${Math.floor(
        Math.random() * (256 - 1 + 1) + 0
      )},${Math.floor(Math.random() * (256 - 1 + 1) + 0)})`
    );

    // 创建位置
    this.position = [
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
      Math.floor(Math.random() * (5 - 0 + 1) + 0),
    ];
  }

  // 随机切换颜色
  randColor() {
    this.model.material.color = new THREE.Color(
      `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)} )`
    );
  }
}

// 2. 创建立方缓冲几何体类、

class MyCube extends BaseModal {
  constructor(scene) {
    super(scene);

    // 设置大小
    this.size = [
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
      Math.floor(Math.random() * (3 - 1 + 1) + 1),
    ];

    this.init();
  }

  init() {
    // 创建图形
    const geometry = new THREE.BoxGeometry(...this.size);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
    });

    // 创建物体
    const mesh = new THREE.Mesh(geometry, material);

    // 设置立方缓存几何体坐标
    mesh.position.set(...this.position);

    // 添加到场景
    this.scene.add(mesh);

    // 将创建的物体交给变量保存
    this.model = mesh;
  }
}

// 3. 创建球形缓存几何体体类
class MySphere extends BaseModal {
  constructor(scene) {
    super(scene);

    // 设置球体的半径
    this.radius = Math.floor(Math.random() * (2 - 1 + 1) + 1);

    this.init();
  }

  init() {
    // 创建图形
    const geometry = new THREE.SphereGeometry(this.radius, 32, 16);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
    });

    // 创建物体
    const mesh = new THREE.Mesh(geometry, material);

    // 设置球体坐标
    mesh.position.set(...this.position);

    // 添加到场景
    this.scene.add(mesh);

    // 将创建的物体交给变量保存
    this.model = mesh;
  }
}

// // 创建立方体
// const myCube = new MyCube(scene);

// // 创建球体
// const yySphere = new MySphere(scene);
const arr = [];
for (let i = 0; i < 5; i++) {
  arr.push(new MyCube(scene));
  arr.push(new MySphere(scene));
}

window.addEventListener("dblclick", () => {
  arr.forEach((item) => {
    item.randColor();
  });
});
