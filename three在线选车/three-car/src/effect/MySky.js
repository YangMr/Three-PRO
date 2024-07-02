import * as THREE from "three";
export class MySky {
  constructor(scene) {
    this.scene = scene;
    this.init();
  }

  // 初始化场景
  init() {
    // 调用创建室内展厅方法
    this.createInDoor();
  }

  // 创建室内展厅方法
  createInDoor() {
    // 创建图形(几何体)
    const sphereGeo = new THREE.SphereGeometry(10, 32, 16);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x42454c,
      side: THREE.DoubleSide,
    });

    // 创建物体
    const sphere = new THREE.Mesh(sphereGeo, material);

    // 添加到场景
    this.scene.add(sphere);

    // 创建地面
    const circleGeo = new THREE.CircleGeometry(10, 32);
    const circleMaterial = new THREE.MeshStandardMaterial({
      color: 0x42454c,
      // color: "green",
      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(circleGeo, circleMaterial);
    circle.rotation.set(-Math.PI / 2, 0, 0);
    // 接受阴影
    circle.receiveShadow = true;

    this.scene.add(circle);
  }
}
