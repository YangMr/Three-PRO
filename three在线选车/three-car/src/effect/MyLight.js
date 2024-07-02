import * as THREE from "three";
export class MyLight {
  constructor(scene) {
    // 拿到场景
    this.scene = scene;

    // 设置灯光的坐标
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0],
    ];

    // 调用创建平行光方法
    this.createCarDL();

    // 调用创建聚光灯方法
    this.createSportL();
  }

  // 创建平行光
  createCarDL() {
    this.dirPosList.forEach((positionArr) => {
      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(...positionArr);
      // const directionalLight = new THREE.DirectionalLightHelper(light, 1);
      this.scene.add(light);
      // this.scene.add(directionalLight);
    });
  }

  // 创建聚光灯
  createSportL() {
    const light = new THREE.SpotLight(0xffffff, 1000);

    // 开启阴影支持
    light.castShadow = true;

    // 设置光源角度
    light.angle = 0.16 * Math.PI;

    // 设置光源衰减成都
    light.penumbra = 0.8;

    // 设置阴影贴图大小
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;

    //修改光源位置
    light.position.set(0, 10, 0);

    const spotLight = new THREE.SpotLightHelper(light);

    this.scene.add(light);
    this.scene.add(spotLight);
  }
}
