import { Field, MerkleMap, Poseidon, PublicKey } from "snarkyjs";

const buildMap = (
	initializationArray: { publicKeyAsBase58: string; value: Field }[],
) => {
	const map = initializationArray.reduce(
		(acc, { publicKeyAsBase58, value }) => {
			acc.set(
				Poseidon.hash(
					PublicKey.fromBase58(publicKeyAsBase58).toFields(),
				),
				Field(value),
			);
			return acc;
		},
		new MerkleMap(),
	);

	return { map };
};

export { buildMap };
