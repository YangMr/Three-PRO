// 设置事件
import * as THREE from "three";

export class ClickHandler {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ClickHandler();
    }
    return this.instance;
  }

  init(camera) {
    this.camera = camera;
    this.list = [];

    this.map = new Map();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const app = document.querySelector(".app");
    window.addEventListener("click", (event) => {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

      pointer.x = (event.clientX / app.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / app.clientHeight) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera(pointer, this.camera);

      // 获取这条线穿过了哪些物体，收集成一个数组
      const list = raycaster.intersectObjects(this.list);

      list.forEach((obj) => {
        const fn = this.map.get(obj.object);

        fn(obj.object);
      });
    });
  }

  // 传入要点击的物体与函数体
  addMesh(mesh, fn) {
    this.list.push(mesh);
    this.map.set(mesh, fn);
  }
}
