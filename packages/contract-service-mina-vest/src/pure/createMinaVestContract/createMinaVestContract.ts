import { MinaVest } from "contracts";
import { Mina, PublicKey, fetchAccount } from "snarkyjs";

const createMinaVestContract = async ({
	contractAddress,
	skipCompile = false,
}: {
	contractAddress: string;
	skipCompile?: boolean;
}): Promise<{
	zkAppAccount: Awaited<ReturnType<typeof fetchAccount>>["account"];
	zkAppAddress: ReturnType<typeof PublicKey["fromBase58"]>;
	zkAppInstance: MinaVest;
}> => {
	console.log("1");

	const Berkeley = Mina.Network({
		mina: "https://proxy.berkeley.minaexplorer.com/graphql",
		archive: "https://archive.berkeley.minaexplorer.com",
	});

	console.log("2");
	Mina.setActiveInstance(Berkeley);

	const zkAppAddress = PublicKey.fromBase58(contractAddress);

	console.log("3");
	const zkAppInstance = new MinaVest(zkAppAddress);

	console.log("4");

	if (!skipCompile) {
		await MinaVest.compile();
	}

	console.log("5");
	const response = await fetchAccount({ publicKey: zkAppAddress });

	console.log("6");
	if (response.error) {
		throw Error(response.error.statusText);
	}

	return {
		zkAppInstance,
		zkAppAddress,
		zkAppAccount: response.account,
	};
};

export { createMinaVestContract };
