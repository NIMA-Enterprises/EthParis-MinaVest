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

const addUser = async ({
	contractAddress,
	feePayerPublicKeyAsBase58,
}: {
	contractAddress: string;
	feePayerPublicKeyAsBase58: string;
}) => {
	const { zkAppInstance } = await createMinaVestContract({
		contractAddress,
	});

	const userWitness = new MerkleMap().getWitness(Field(1));

	const txn = await Mina.transaction(
		{
			sender: PublicKey.fromBase58(feePayerPublicKeyAsBase58),
			fee: 100_000_000,
			memo: "Frontend App Initialize",
		},
		() => {
			zkAppInstance.addUser(userWitness);
		},
	);

	await txn.prove();

	return {
		proof: txn.toJSON(),
	};
};

export { addUser };
