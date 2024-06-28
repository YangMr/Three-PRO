import dat from "dat.gui";
export default function createGui(m) {
  // 创建dat.GUI实例

  const gui = new dat.GUI();

  gui.add(m.position, "x", -1, 2, 0.01).name("位移x");
  gui.add(m.position, "y", -1, 2, 0.01).name("位移y");
  gui.add(m.position, "z", -1, 2, 0.01).name("位移z");
  gui.add(m.rotation, "x", -1, 2).step(0.01).name("旋转x");
  gui.add(m.rotation, "y", -1, 2).step(0.01).name("旋转y");
  gui.add(m.rotation, "z", -1, 2).step(0.01).name("旋转z");
}
