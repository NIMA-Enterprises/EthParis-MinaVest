import type MinaProvider from "@aurowallet/mina-provider";
import { MinaVest } from "contracts";
import { AccountUpdate, Mina, PrivateKey, PublicKey } from "snarkyjs";
import { wagmiClient } from "wallet-connection";

const generateTxProofForOrganisationDeploy = async ({
	zkAppPrivateKeyAsBase58,
	feePayerPublicKeyAsBase58,
}: {
	zkAppPrivateKeyAsBase58: string;
	feePayerPublicKeyAsBase58: string;
}) => {
	const Berkeley = Mina.Network(
		"https://proxy.berkeley.minaexplorer.com/graphql",
	);

	Mina.setActiveInstance(Berkeley);

	const zkAppPrivateKey: PrivateKey = PrivateKey.fromBase58(
		zkAppPrivateKeyAsBase58,
	);
	const zkAppPublicKey: PublicKey = zkAppPrivateKey.toPublicKey();

	const { verificationKey } = await MinaVest.compile();

	const tx = await Mina.transaction(
		{
			sender: PublicKey.fromBase58(feePayerPublicKeyAsBase58),
			fee: 100_000_000,
			memo: "Deploy",
		},
		() => {
			AccountUpdate.fundNewAccount(
				PublicKey.fromBase58(feePayerPublicKeyAsBase58),
			);
			new MinaVest(zkAppPublicKey).deploy({
				verificationKey,
			});
		},
	);

	await tx.prove();

	const proof = tx.sign([zkAppPrivateKey]).toJSON();

	return { proof };
};

export { generateTxProofForOrganisationDeploy };
