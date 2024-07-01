// 目标：学习 class 语法
// 好处：封装对象的属性和方法模板，提高代码复用性，高内聚，代码编写和管理结构清晰

// function Person() {
//   this.name = "John";
//   this.age = 20;
// }

// Person.prototype.sayHello = function () {
//   console.log(`Hello, my name is ${this.name}`);
// };

// // 构造函数 --- 类
// const person = new Person();

// console.log("name", person.name);
// console.log("age", person.age);
// person.sayHello();

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("john", 30);
const person1 = new Person("张三", 40);
const person2 = new Person("王五", 50);

console.log("name", person.name);
console.log("age", person.age);
person.sayHello();

console.log("name", person1.name);
console.log("age", person1.age);
person1.sayHello();

console.log("name", person2.name);
console.log("age", person2.age);
person2.sayHello();
