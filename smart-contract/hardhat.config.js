/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'scroll_sepolia_testnet',
    networks: {
      hardhat: {},
      scroll_sepolia_testnet: {
        url: 'https://rpc.ankr.com/scroll_sepolia_testnet',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
