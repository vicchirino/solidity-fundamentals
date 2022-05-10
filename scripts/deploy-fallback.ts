
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy(name, ...args) {
  const Fallback = await ethers.getContractFactory(name);
  const fallback = await Fallback.deploy(...args);
  await fallback.deployed();

  console.log("Counter contract address: --> ", fallback.address)

  return fallback
}

// @ts-ignore
async function fallback() {
  const a = await deploy("A");
  const b = await deploy("B", (await a).address);

  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("....................");

  await a.setA(42);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("....................");

  await b.setB(60);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("....................");
}

fallback();

// class Foo {
//   private bar: number;
//   foo() { console.log("foo", this.bar) }
// }

// const foo = new Foo();
// foo.foo();
// foo.foo.call({
//   bar: 42
// })