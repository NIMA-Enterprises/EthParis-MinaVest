import { generateTxProofForOrganisationDeploy } from "./steps/1/generateTxProof";
import { sendTx } from "./steps/2/sendTx";
import { generateTxProof } from "./steps/3/generateTxProof";
import { sendTx as sendTx2 } from "./steps/4/sendTx";
import { generateTxProof as generateTxProof2 } from "./steps/5/generateTxProof";
import { sendTx as sendTx3 } from "./steps/6/sendTx";

const step1 = { generateTxProofForOrganisationDeploy };
const step2 = { sendTx };
const step4 = { generateTxProof };
const step5 = { sendTx: sendTx2 };
const step6 = { generateTxProof: generateTxProof2 };
const step7 = { sendTx: sendTx3 };

const createVesting = { step1, step2, step4, step5, step6, step7 };

export { createVesting };
