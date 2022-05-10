// SPDX-License-Identifier: MIT

pragma solidity^0.8.0;

/*
I should be able to get my heroes I have generated.
Heroes should be stored on the chain.
stats are strength, health, intellect, magic, dexterity
stats are randomly generated
A scale of 1 - 18
The stats are randomly picked and their amplitude is randomly determined according to the following:
Stat 1 can max at 18
Stat 2 can max at 17
Stat 3 can max at 16
...
You could imagine these being an NFT
They are non divisable
*/

contract Hero {

  enum Class { Humano, Enano, Elfo, Mago }

  mapping(address => uint[]) addressToHeroes;

  function generateRandom() public virtual view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
}

  function getHeroes() public view returns (uint[] memory) {
    return addressToHeroes[msg.sender];
  }

  function getStrength(uint hero) public pure returns (uint32) {
    return uint32((hero >> 2) & 0x1F);
  }

  function getHealth(uint hero) public pure returns (uint32) {
    return uint32((hero >> 7) & 0x1F);
  }

  function getIntellect(uint hero) public pure returns (uint32) {
    return uint32((hero >> 12) & 0x1F);
  }

  function getMagic(uint hero) public pure returns (uint32) {
    return uint32((hero >> 17) & 0x1F);
  }

  function getDexterity(uint hero) public pure returns (uint32) {
    return uint32((hero >> 22) & 0x1F);
  }

  function createHero(Class class) public payable {
    require(msg.value >= 0.05 ether, "Please send more money");

    // stats are [strength, health, intellect, magic, dexterity]
    uint[] memory stats = new uint[](5);
    stats[0] = 2;
    stats[1] = 7;
    stats[2] = 12;
    stats[3] = 17;
    stats[4] = 22;

    uint len = 5;
    uint hero = uint(class);

    do {
      uint position = generateRandom() % len;
      uint value = generateRandom() % (13 + len) + 1;

      hero |= value << stats[position];

      len--;
      stats[position] = stats[len];
    } while (len > 0);

    addressToHeroes[msg.sender].push(hero);
  }

}


