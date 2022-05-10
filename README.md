## Resources:
- Libraries: https://theprimeagen.github.io/web3-smart-contracts/your-first-contract#lets-test
  - hardhat
  - ethers
  - chai
  - @nomiclabs/hardhat-ethers
  - @nomiclabs/hardhat-waffle
  - ethereum-waffle
- Gas: https://github.com/crytic/evm-opcodes
- Ethgas Station: https://ethgasstation.info
- FrontendMaster Course: https://theprimeagen.github.io/web3-smart-contracts/
- Learn coding: https://cryptozombies.io

## Commands:
- npx hardhat node --> Crete local accounts
- Contract bytecode size --> cat artifacts/contracts/{Contract-Name}.sol/{Contract-Name}.json | jq .deployedBytecode | wc -c
- Contract size in bytes --> $(($(cat artifacts/contracts/{Contract-Name}.sol/{Contract-Name}.json | jq .deployedBytecode | wc -c) / 2 - 1 ))

```
total-cost = gas-cost * gas-used * 10^9 * eth-cost / 10^18
// Or simplified as
total-cost = gas-cost * gas-used * eth-cost / 10^9

```
  