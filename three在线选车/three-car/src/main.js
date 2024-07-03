import "./style/base.css";

import { camera } from "./entry/index";

import { ClickHandler } from "./utils/ClickHandle";

ClickHandler.getInstance().init(camera);
