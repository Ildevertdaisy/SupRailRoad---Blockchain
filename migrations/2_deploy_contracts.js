var Marketplace = artifacts.require("Marketplace");
var NFT = artifacts.require("NFT");
fs = require('fs');



module.exports = async function(deployer, _, accounts) {
  try {
    await deployer.deploy(Marketplace);
    const marketplace = await Marketplace.deployed() 
    console.log("Marketplace contract deployed to:", marketplace.address);

    await deployer.deploy(NFT, marketplace.address);
    const nft = await NFT.deployed() 
    console.log("NFT contract deployed to:", nft.address);
    
    let deployed = `module.exports = {admin:${accounts[0]}, marketplace: ${marketplace.address}, nft:${nft.address}}`
    let data = JSON.stringify(deployed);
 
    fs.writeFileSync('./client/src/deploy.js', JSON.parse(data),  function (err) {
      if (err) return console.log(err)
    })
  } catch (e) {
    console.error(e);
  }
};
  