export class EventBus {
  constructor() {
    // 保存事件名 和要触发的函数
    this.eventObj = {};
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  // 订阅事件
  on(eventName, fn) {
    if (!this.eventObj[eventName]) {
      this.eventObj[eventName] = []; // 创建一个数组来存放函数
    }
    this.eventObj[eventName].push(fn);
  }

  // 触发事件
  emit(eventName, ...arg) {
    this.eventObj[eventName].forEach((fn) => {
      fn(...arg);
    });
  }
}
