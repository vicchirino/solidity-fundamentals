import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe.skip("TestGas ", function() {
  it("Test", async function() {
    const TestGas = await ethers.getContractFactory("TestGas");
    const testGas = await TestGas.deploy();
    await testGas.deployed();


    for (let index = 0; index < 10; index++) {
      await testGas.test1();
      await testGas.test2();
      await testGas.test3();
      await testGas.test4();
      await testGas.test5();
    }
  })
})