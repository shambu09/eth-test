const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Inbox test";
const TEST_STRING = "Inbox test:setMessage";

beforeEach(async () => {
	//Get the list of all acoounts.
	accounts = await web3.eth.getAccounts();
	//Deploy using any of those accounts.

	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: [INITIAL_STRING] })
		.send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
	it("deploys a contract", () => {
		assert.ok(inbox.options.address);
	});

	it("has a default message", async () => {
		const message = await inbox.methods.message().call();
		assert.strictEqual(message, INITIAL_STRING);
	});

	it("can change the message", async () => {
		await inbox.methods
			.setMessage(TEST_STRING)
			.send({ from: accounts[0], gas: "1000000" });
		const message = await inbox.methods.message().call();
		assert.strictEqual(message, TEST_STRING);
	});
});
