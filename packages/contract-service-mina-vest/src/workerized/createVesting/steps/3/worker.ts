import { initialize } from "../../../../pure/initialize";
import { Ready } from "../../../spawn";
import { expose } from "comlink";

const worker = {
	generateTransactionProof: initialize,
};

export type GenerateTransactionProofType = typeof worker;

expose(worker);
postMessage(Ready);
