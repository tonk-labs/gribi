// import { forge, getOutDirectory, getRemappings, getRpcUrl, getSrcDirectory } from "@latticexyz/common/foundry";
// import { sendTransaction } from "@latticexyz/common";
// import { createWalletClient, concatHex, getBytecode, http, padHex, encodeDeployData, size } from "viem";
// import gribiBuild from "gribi-contracts/out/GribiPrototype.sol/GribiPrototype.json"

// import deployment from "./create2/deployment.json";

// const deployer = `0x${deployment.address}` 
// const salt = padHex("0x", { size: 32 });

//   const rpc = opts.rpc ?? (await getRpcUrl(profile));
//   const privateKey = process.env.PRIVATE_KEY; 


//   const client = createWalletClient({
//     transport: http(rpc),
//     account: privateKeyToAccount(privateKey),
//   });

// const gribiBytecode = encodeDeployData({
//   bytecode: gribiBuild.bytecode.object,
//   abi: [],
// });

// const gribiBytecodeSize = size(gribiBuild.deployedBytecode.object);

// const address = getCreate2Address({ from: deployer, salt, gribiBytecode });

// const contractCode = await getBytecode(client, { address, blockTag: "pending" });
//   if (contractCode) {
//     debug("found", label, "at", address);
//     return [];
//   }

// let tx = await sendTransaction(client, {
//     chain: client.chain ?? null,
//     to: deployer,
//     data: concatHex([salt, gribiBytecode]),
// });

// console.log("Deployed gribi at address ", address);

const { createWalletClient, toHex, concatHex, getCreate2Address, parseAbi, http, padHex, encodeDeployData, size, keccak256 } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { getBytecode } = require("viem/actions");
const gribiBuild = require("gribi-contracts/out/Gribi.sol/Gribi.json");

const deployment = require("./create2/deployment.json");

const deployer = `0x${deployment.address}`;
const salt = padHex("0x", { size: 32 });

async function loadModules() {
    const { sendTransaction } = await import("@latticexyz/common");
    // Now you can use sendTransaction and any other imports from @latticexyz/common

    async function deployContract() {
    const opts = {}; // Assuming you have options to pass, adjust accordingly
    const profile = {}; // Define or obtain the profile if needed for `getRpcUrl`
    //   const rpc = opts.rpc || await getRpcUrl(profile);
    const rpc = "http://127.0.0.1:8545"
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    const client = createWalletClient({
        transport: http(rpc),
        account: privateKeyToAccount(privateKey), // Ensure privateKeyToAccount is defined or imported
    });

    const gribiBytecode = encodeDeployData({
        bytecode: gribiBuild.bytecode.object,
        abi: parseAbi(["constructor(bytes32)"]),
        args: [keccak256(toHex("1.0"))]
    });

    const gribiBytecodeSize = size(gribiBuild.deployedBytecode.object);

    const address = getCreate2Address({ from: deployer, salt, gribiBytecode }); // Ensure getCreate2Address is defined or imported

    const contractCode = await getBytecode(client, { address, blockTag: "pending" });
    if (contractCode) {
        console.log("found", label, "at", address); // Ensure 'label' is defined
        return [];
    }

    let tx = await sendTransaction(client, {
        chain: client.chain || null,
        to: deployer,
        data: concatHex([salt, gribiBytecode]),
    });

    console.log("Deployed gribi at address ", address);
    }

    return deployContract().then(() => console.log("Deployment script executed successfully.")).catch((error) => console.error(error));
  }

  // also need to deploy modules which are in a certain subdirectory it can then call registerThreads on those addresses

  loadModules().then(() => {
    // Your code that depends on sendTransaction and other imports goes here
  }).catch((e) => console.error(e));

