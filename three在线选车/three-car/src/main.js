import "./style/base.css";

import "./menu";

import { camera } from "./entry/index";

import { ClickHandler } from "./utils/ClickHandle";

ClickHandler.getInstance().init(camera);
