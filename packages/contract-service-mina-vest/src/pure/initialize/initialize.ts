import { createMinaVestContract } from "../createMinaVestContract";
import { getVerifiedKeysRoot } from "backend-service-mina-vest";
import { Field, MerkleMap, Mina, PublicKey, Signature, UInt64 } from "snarkyjs";

const initialize = async ({
	contractAddress,
	feePayerPublicKeyAsBase58,
}: {
	contractAddress: string;
	feePayerPublicKeyAsBase58: string;
}) => {
	const { zkAppInstance } = await createMinaVestContract({
		contractAddress,
	});

	const usersMerkleMapRoot = new MerkleMap().getRoot();

	const verifiedKeysMerkleMapRoot = await getVerifiedKeysRoot(undefined);

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

	return {
		proof: txn.toJSON(),
	};
};

export { initialize };
