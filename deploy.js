const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
	"gallery omit diamond mandate release ridge seed visit elbow organ fan together",
	"https://rinkeby.infura.io/v3/9f58bc53ac4248fcba58af4a2b6f7ff4"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log(`Attempting to deploy from account ${accounts[0]}`);
	const ressult = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ["My First Deployment"] })
		.send({ gas: "1000000", from: accounts[0] });

	console.log(`Contract deployed to ${ressult.options.address}`);
};
deploy();
