import { generateTxProofForOrganisationDeploy } from "./steps/1/generateTxProof";
import { sendTx } from "./steps/2/sendTx";

const step1 = { generateTxProofForOrganisationDeploy };
const step2 = { sendTx };

const createVesting = { step1, step2 };

export { createVesting };
