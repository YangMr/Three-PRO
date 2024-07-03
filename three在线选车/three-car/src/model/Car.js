import * as THREE from "three";
import { MySprite } from "./MySprite";
import { ClickHandler } from "@/utils/ClickHandle";
import gsap from "gsap";
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
          mark: [
            {
              name: "sprite",
              url: "image/sprite.png",
              position: [1.07, 1.94, -0.23],
              scale: [0.2, 0.2],
            },
          ],
        },
        // 右车门
        rightDoor: {
          name: "Object_77",
          model: {},
          mark: [
            {
              // name, url, position, scale
              name: "sprite",
              url: "image/sprite.png",
              position: [-1.05, 0.78, -0.23],
              scale: [0.2, 0.2],
            },
          ],
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
    this.createDoorSprite();
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

  // 创建车门上的精灵物体
  createDoorSprite() {
    // 获取左车门与右车门
    const markList = [
      this.carModel.body.leftDoor,
      this.carModel.body.rightDoor,
    ];

    markList.forEach((obj) => {
      obj.mark.forEach((smallObj) => {
        if (smallObj.name === "sprite") {
          // 生成标记点
          const sprite = new MySprite(smallObj);
          // 将标记点添加到车门上面
          obj.model.add(sprite);

          // 点击车门的热点标记
          ClickHandler.getInstance().addMesh(sprite, (cube) => {
            console.log("cube", cube.parent.parent.parent);
            const targetDoor = cube.parent.parent.parent;
            console.log("targetDoor", targetDoor);
            if (!targetDoor.userData.isOpen) {
              this.setDoorAnimation(targetDoor.rotation, { x: Math.PI / 3 });
              targetDoor.userData.isOpen = true;
            } else {
              this.setDoorAnimation(targetDoor.rotation, { x: 0 });
              targetDoor.userData.isOpen = false;
            }

            // this.camera.position.set(-0.28, 0.738, -0.259);
            // this.camera.rotation.set(-163.72, -3.2, -179.07);

            this.setCameraAnimation({
              camera: {
                x: -0.28,
                y: 0.738,
                z: -0.259,
                rotationX: -163.72,
                rotationY: -3.2,
                rotationZ: -179.07,
              },
            });
          });
        }
      });
    });
  }

  // 车门动画方法
  setDoorAnimation(mesh, obj) {
    gsap.to(mesh, {
      x: obj.x,
      duration: 1,
      ease: "power1.in",
    });
  }

  // 摄像机动画
  setCameraAnimation(dataObj) {
    gsap.to(this.camera.position, {
      ...dataObj.camera,
      duration: 1,
      ease: "power1.in",
    });
  }
}
