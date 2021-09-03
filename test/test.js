let PcsABI = require("C:/Users/firei/Desktop/rscContract/rscContract/api.json");
const { ethers } = require("hardhat");
var deployer, testAC1, testAC2, testAC3, testAC4, testAC5, testAC6, testAC7,testAC8;
var deployer_, testAC1_, testAC2_, testAC3_, testAC4_, testAC5_, testAC6_, testAC7_,testAC8_;
var pancake;
var  rsc,RscContract;
describe("RSC Main Contract test",()=>{

before(async ()=>{
    [deployer, testAC1, testAC2, testAC3, testAC4, testAC5, testAC6, testAC7,testAC8] = await ethers.getSigners();
    rsc = await ethers.getContractFactory('RSC');
    RscContract = await rsc.deploy();
    await RscContract.deployed();
    console.log("RSC Address: "+RscContract.address);
    pancake = new ethers.Contract('0x10ED43C718714eb63d5aA57B78B54704E256024E',PcsABI,ethers.provider);
    deployer_ = pancake.connect(deployer);
    testAC1_ = pancake.connect(testAC1);
    testAC2_ = pancake.connect(testAC2);
    testAC3_ = pancake.connect(testAC3);
    testAC4_ = pancake.connect(testAC4);
});

it("should add liquidity to the token",async ()=>{
    var tokens=25*10**9*10**9;
    tokens = String(tokens);
    var eth = 500*1e18;
    eth= String(eth);
    var dp = RscContract.connect(deployer);
    await dp.approve(pancake.address,tokens);
    await deployer_.addLiquidityETH(RscContract.address,tokens,100,tokens,deployer.address,eth,{value:eth});
    console.log(await ethers.provider.getBalance(deployer.address)/1e18);
});

it("should allow owner to increase max transaction", async ()=>{
    var dp = RscContract.connect(deployer);
    console.log("max tx"+await dp.maxTxAllowed()/1e9);
    await dp.setMaxTx(await dp.totalSupply()/1e9);
    console.log("max tx"+await dp.maxTxAllowed()/1e9);
});

it("should allow testAC1 to buy", async()=>{
    var eth = 10*1e18;
    eth = String(eth);
    var t = RscContract.connect(testAC1);
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    await testAC1_.swapExactETHForTokensSupportingFeeOnTransferTokens(0,['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',RscContract.address],testAC1.address,Date.now(),{value:eth});
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
});

it("should allow testAC2 to buy", async()=>{
    var eth = 10*1e18;
    eth = String(eth);
    var t = RscContract.connect(testAC2);
    console.log("balance "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    await testAC2_.swapExactETHForTokensSupportingFeeOnTransferTokens(0,['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',RscContract.address],testAC2.address,Date.now(),{value:eth});
    console.log("balance "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
});

it("should allow testAC3 to buy", async()=>{
    var eth = 10*1e18;
    eth = String(eth);
    var t = RscContract.connect(testAC3);
    console.log("balance "+ await t.balanceOf(testAC3.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    await testAC2_.swapExactETHForTokensSupportingFeeOnTransferTokens(0,['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',RscContract.address],testAC3.address,Date.now(),{value:eth});
    console.log("balance "+ await t.balanceOf(testAC3.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
});

it("should add to liquidity", async ()=>{
    var t = RscContract.connect(deployer);
    var balancionREdis =await  t.balanceOf( RscContract.address)/1e9;
    balancionREdis = String(balancionREdis);
    console.log(balancionREdis);
    await t.AddToLP(String(balancionREdis*1e9));
    console.log("redis balance after lp addition "+await  t.balanceOf( RscContract.address)/1e9);
});

it("should allow testac1 to sell half", async()=>{
    var t = RscContract.connect(testAC1);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC1.address)/1e18);
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
    await t.approve(pancake.address,await t.balanceOf(testAC1.address));
    var bal = await t.balanceOf(testAC1.address);
    bal /=2;
    bal = String(bal);
    await testAC1_.swapExactTokensForETHSupportingFeeOnTransferTokens(bal,0,[RscContract.address,'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],testAC1.address,Date.now());
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC1.address)/1e18);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
});

it("should allow testAC1 to buy", async()=>{
    var eth = 10*1e18;
    eth = String(eth);
    var t = RscContract.connect(testAC1);
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    await testAC1_.swapExactETHForTokensSupportingFeeOnTransferTokens(0,['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',RscContract.address],testAC1.address,Date.now(),{value:eth});
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
});

it("should allow testac2 to sell all", async()=>{
    var t = RscContract.connect(testAC2);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC2.address)/1e18);
    console.log("balance "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("balance ac1 "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
    await t.approve(pancake.address,await t.balanceOf(testAC2.address));
    await testAC2_.swapExactTokensForETHSupportingFeeOnTransferTokens(await t.balanceOf(testAC2.address),0,[RscContract.address,'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],testAC2.address,Date.now());
    console.log("balance "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC2.address)/1e18);
    console.log("balance ac1 "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
});

it("should allow testac3 to sell all", async()=>{
    var t = RscContract.connect(testAC3);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC3.address)/1e18);
    console.log("balance "+ await t.balanceOf(testAC3.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac1 "+ await t.balanceOf(testAC1.address)/1e9);
    await t.approve(pancake.address,await t.balanceOf(testAC3.address));
    await testAC3_.swapExactTokensForETHSupportingFeeOnTransferTokens(await t.balanceOf(testAC3.address),0,[RscContract.address,'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],testAC3.address,Date.now());
    console.log("balance "+ await t.balanceOf(testAC3.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC3.address)/1e18);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac1 "+ await t.balanceOf(testAC1.address)/1e9);
});

it("should allow testac1 to sell all", async()=>{
    var t = RscContract.connect(testAC1);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC1.address)/1e18);
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
    await t.approve(pancake.address,await t.balanceOf(testAC1.address));
    await testAC1_.swapExactTokensForETHSupportingFeeOnTransferTokens(await t.balanceOf(testAC1.address),0,[RscContract.address,'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],testAC1.address,Date.now());
    console.log("balance "+ await t.balanceOf(testAC1.address)/1e9);
    console.log("balance of redistribution "+ await t.balanceOf(await t.redistributionWallet())/1e9);
    console.log("balance of PDev " +await t.balanceOf(await t.DevelopmentWallet())/1e9);
    console.log("Balance of contract "+ await t.balanceOf(await RscContract.address)/1e9);
    console.log("bnb balance "+ await ethers.provider.getBalance(testAC1.address)/1e18);
    console.log("balance ac2 "+ await t.balanceOf(testAC2.address)/1e9);
    console.log("balance ac3 "+ await t.balanceOf(testAC3.address)/1e9);
});
});