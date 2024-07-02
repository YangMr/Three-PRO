import * as THREE from "three";
export class MyCar {
  constructor(model, scene, camera, controls) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    // 车小模型对象
    this.carModel = {
      body: {
        // 车身
        main: {
          name: "Object_103",
          model: {},
        },
        // 车顶
        roof: {
          name: "Object_110",
          model: {},
        },

        // 左车门
        leftDoor: {
          name: "Object_64",
          model: {},
        },
        // 右车门
        rightDoor: {
          name: "Object_77",
          model: {},
        },

        // 后轮胎
        ft: {
          name: "Object_4",
          model: {},
        },

        // 前轮胎
        bt: {
          name: "Object_19",
          model: {},
        },
      },
    };

    this.init();

    this.modifyCarDefault();
  }

  // 初始化
  init() {
    this.scene.add(this.model);

    // 匹配出所需要的模型
    Object.values(this.carModel.body).forEach((obj) => {
      obj.model = this.model.getObjectByName(obj.name);
    });
  }

  // 修改匹配出的模型
  modifyCarDefault() {
    Object.values(this.carModel.body).forEach((obj) => {
      obj.model.material = new THREE.MeshPhysicalMaterial({
        color: 0xff9900,
        // 光泽度
        metalness: 1,
        // 粗糙度
        roughness: 0.5,
        // 1. 设置清漆度（0 - 1）
        clearcoat: 1,
        // 2. 设置清漆度的粗糙度
        clearcoatRoughness: 0,
      });
    });
  }
}
