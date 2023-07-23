import { generateTxProofForOrganisationDeploy } from "./steps/1/generateTxProof";
import { sendTx } from "./steps/2/sendTx";
import { generateTxProof } from "./steps/3/generateTxProof";
import { sendTx as sendTx2 } from "./steps/4/sendTx";

const step1 = { generateTxProofForOrganisationDeploy };
const step2 = { sendTx };
const step3 = { generateTxProof };
const step4 = { sendTx: sendTx2 };

const createVesting = { step1, step2, step3, step4 };

export { createVesting };
