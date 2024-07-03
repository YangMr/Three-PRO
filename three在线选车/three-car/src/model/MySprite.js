/**
 * 精灵类
 */

import * as THREE from "three";

export class MySprite {
  constructor({ name, url, position, scale }) {
    // 1.加载图片
    const texture = new THREE.TextureLoader().load(url);

    // 2.创建精灵材质
    const material = new THREE.SpriteMaterial({
      map: texture,
    });

    // 3.创建物体, 并且将加载的图片与材质添加到物体上
    const sprite = new THREE.Sprite(material);

    // 4. 给精灵物体设置名称
    sprite.name = name;

    // 5. 设置精灵物体的位置
    sprite.position.set(...position);

    // 6. 设置精灵物体的缩放
    sprite.scale.set(...scale);

    // 7.将创建的经历物体返回出去
    return sprite;
  }
}
