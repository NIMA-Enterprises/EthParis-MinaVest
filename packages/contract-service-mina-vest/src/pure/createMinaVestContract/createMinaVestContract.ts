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
	const Berkeley = Mina.Network({
		mina: "https://proxy.berkeley.minaexplorer.com/graphql",
		archive: "https://archive.berkeley.minaexplorer.com",
	});
	Mina.setActiveInstance(Berkeley);

	const zkAppAddress = PublicKey.fromBase58(contractAddress);
	const zkAppInstance = new MinaVest(zkAppAddress);

	if (!skipCompile) {
		await MinaVest.compile();
	}

	const response = await fetchAccount({ publicKey: zkAppAddress });

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
