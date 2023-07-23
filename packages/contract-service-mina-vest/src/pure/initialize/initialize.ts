import { createMinaVestContract } from "../createMinaVestContract";
import { getVerifiedKeysRoot } from "backend-service-mina-vest";
import {
	Field,
	MerkleMap,
	Mina,
	PrivateKey,
	PublicKey,
	Signature,
	UInt64,
} from "snarkyjs";

const initialize = async ({
	contractAddress,
	feePayerPublicKeyAsBase58,
	zkAppPrivateKeyAsBase58,
}: {
	contractAddress: string;
	feePayerPublicKeyAsBase58: string;
	zkAppPrivateKeyAsBase58: string;
}) => {
	const { zkAppInstance } = await createMinaVestContract({
		contractAddress,
	});

	const zkAppPrivateKey: PrivateKey = PrivateKey.fromBase58(
		zkAppPrivateKeyAsBase58,
	);

	const usersMerkleMapRoot = new MerkleMap().getRoot();

	const verifiedKeysMerkleMapRoot = new MerkleMap().getRoot();

	const txn = await Mina.transaction(
		{
			sender: PublicKey.fromBase58(feePayerPublicKeyAsBase58),
			fee: 100_000_000,
			memo: "Frontend App Initialize",
		},
		() => {
			zkAppInstance.initialize(
				usersMerkleMapRoot,
				verifiedKeysMerkleMapRoot,
			);
		},
	);

	await txn.prove();

	const proof = txn.sign([zkAppPrivateKey]).toJSON();

	return {
		proof,
	};
};

export { initialize };
