export class MyCar {
  constructor(model, scene, camera, controls) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    this.init();
  }

  init() {
    console.log("!23");
    this.scene.add(this.model);
  }
}
