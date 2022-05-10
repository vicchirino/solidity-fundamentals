import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";


describe("Hero", function() {
  async function createHero() {
    const Hero = await ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy();
    await hero.deployed();
  
    return hero;
  }

  let hero;

  before(async function() {
    hero = await createHero();
  });

  describe("getHeroes()", function() {
    it("should get a zero hero array", async function() {      
      expect(await hero.getHeroes()).to.deep.equal([]);
    });
  });

  describe("createHero()", function() {
    it("should fail if value < 0.5 ether", async function() {      
      await expect(
        hero.createHero(0, {
          value: ethers.utils.parseEther("0.049999999")
        })).to.be.revertedWith("Please send more money")
    })

    it("should create hero with expected values", async function() {      
      const hero = await createHero();

      await hero.setRandom(69);
      await hero.createHero(0, {
        value: ethers.utils.parseEther("0.05")
      });
      const h = (await hero.getHeroes())[0];
      
      // [S, H, I, M, D] --> len=5
      // [S, M, I, M] --> len=4
      // [I, M, I] --> len=3
      // [I, M] --> len=2
      // [I] --> len=1

      expect(await hero.getDexterity(h)).to.equal(16);
      expect(await hero.getHealth(h)).to.equal(2);
      expect(await hero.getStrength(h)).to.equal(6);
      expect(await hero.getMagic(h)).to.equal(10);
      expect(await hero.getIntellect(h)).to.equal(14);
    })
  });

});