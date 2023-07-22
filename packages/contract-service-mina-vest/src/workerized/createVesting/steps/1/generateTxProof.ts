import { spawn } from "../../../spawn";
import { GenerateTxProofForOrganisationDeployType } from "./worker";
import importedWorker from "./worker?worker";

const generateTxProofForOrganisationDeploy = async ({
	feePayerPublicKeyAsBase58,
	zkAppPrivateKeyAsBase58,
}: Parameters<
	GenerateTxProofForOrganisationDeployType["generateTxProofForOrganisationDeploy"]
>["0"]) => {
	const { worker, terminate } =
		await spawn<GenerateTxProofForOrganisationDeployType>(importedWorker);

	try {
		const { proof } = await worker.generateTxProofForOrganisationDeploy({
			feePayerPublicKeyAsBase58,
			zkAppPrivateKeyAsBase58,
		});

		return { proof };
	} finally {
		terminate();
	}
};

export { generateTxProofForOrganisationDeploy };
