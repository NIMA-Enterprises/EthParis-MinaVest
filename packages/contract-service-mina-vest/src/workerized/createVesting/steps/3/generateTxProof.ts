import { generateExecuteMessageHash } from "../1/generateExecuteMessageHash";
import { signMessage } from "../2/signMessage";
import { spawn } from "../../../spawn";
import { GenerateTransactionProofType } from "./worker";
import importedWorker from "./worker?worker";
import { waitForAccountChange } from "wallet-connection";

const generateTxProof = async ({
	contractAddress,
	feePayerPublicKeyAsBase58,
}: {
	contractAddress: string;
	feePayerPublicKeyAsBase58: string;
}) => {
	const { worker, terminate } = await spawn<GenerateTransactionProofType>(
		importedWorker,
	);

	try {
		const { proof } = await worker.generateTransactionProof({
			contractAddress,
			feePayerPublicKeyAsBase58,
		});

		return { proof };
	} finally {
		terminate();
	}
};

export { generateTxProof };
