import { addUser } from "../../../../pure/addUser";
import { Ready } from "../../../spawn";
import { expose } from "comlink";

const worker = {
	generateTransactionProof: addUser,
};

export type GenerateTransactionProofType = typeof worker;

expose(worker);
postMessage(Ready);
