import { generateTxProofForOrganisationDeploy } from "../../../../pure";
import { Ready } from "../../../spawn";
import { expose } from "comlink";

const worker = {
	generateTxProofForOrganisationDeploy: generateTxProofForOrganisationDeploy,
};

export type GenerateTxProofForOrganisationDeployType = typeof worker;

expose(worker);
postMessage(Ready);
