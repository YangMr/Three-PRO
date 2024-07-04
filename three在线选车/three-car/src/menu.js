import { EventBus } from "./utils/EventBus";

/**
 * 车漆切换
 */
const colorDivList = document.querySelectorAll(".col_group > div");
colorDivList.forEach((element) => {
  element.addEventListener("click", () => {
    const colorStr = element.dataset.col;
    EventBus.getInstance().emit("changeCarColor", colorStr);
  });
});

/**
 * 场景切换
 */
const sceneDivList = document.querySelectorAll(".scene_group > div");

sceneDivList.forEach((element) => {
  element.addEventListener("click", () => {
    const scenePoi = element.dataset.poi;
    EventBus.getInstance().emit("changeSky", scenePoi);
  });
});

/**
 * 视角切换
 */
const lookDivList = document.querySelectorAll(".look_group > div");
lookDivList.forEach((element) => {
  element.addEventListener("click", () => {
    const lookPos = element.dataset.pos;
    EventBus.getInstance().emit("changeCarAngleView", lookPos);
  });
});

/**
 * 贴膜切换
 */
const coatDivList = document.querySelectorAll(".coat_group > div");
coatDivList.forEach((element) => {
  element.addEventListener("click", () => {
    const coat = element.dataset.coa;
    EventBus.getInstance().emit("changeCarCoat", coat);
  });
});
