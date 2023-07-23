/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";

import { minaVestBusinessLogicApi } from "./api";
import { PrivateKey } from "snarkyjs";
import { wagmiClient } from "wallet-connection";

const useCreateVesting = () => {
	const [
		generateTxProofForOrganisationDeploy,
		generateTxProofForOrganisationDeployMutationObj,
	] = minaVestBusinessLogicApi.useCreateVestingStep1Mutation({
		fixedCacheKey: "useCreateVestingStep1Mutation",
	});
	const [sendTx, sendTxMutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep2Mutation({
			fixedCacheKey: "useCreateVestingStep2Mutation",
		});

	const [generateInitializeTxProof, generateInitializeTxProofMutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep3Mutation({
			fixedCacheKey: "useCreateVestingStep3Mutation",
		});

	const [sendTx2, sendTx2MutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep4Mutation({
			fixedCacheKey: "useCreateVestingStep4Mutation",
		});

	React.useEffect(() => {
		return () => {
			generateTxProofForOrganisationDeployMutationObj.reset();
			sendTxMutationObj.reset();
		};
	}, []);

	const steps = [
		{
			name: "Generate proof for organisation deploy" as const,
			isLoading:
				generateTxProofForOrganisationDeployMutationObj.isLoading,
			isUninitialized:
				generateTxProofForOrganisationDeployMutationObj.isUninitialized,
			isSuccess:
				generateTxProofForOrganisationDeployMutationObj.isSuccess,
			isError: generateTxProofForOrganisationDeployMutationObj.isError,
		},
		{
			name: "Send organisation tx" as const,
			isLoading: sendTxMutationObj.isLoading,
			isUninitialized: sendTxMutationObj.isUninitialized,
			isSuccess: sendTxMutationObj.isSuccess,
			isError: sendTxMutationObj.isError,
		},
		{
			name: "Initialize proof generation" as const,
			isLoading: generateInitializeTxProofMutationObj.isLoading,
			isUninitialized:
				generateInitializeTxProofMutationObj.isUninitialized,
			isSuccess: generateInitializeTxProofMutationObj.isSuccess,
			isError: generateInitializeTxProofMutationObj.isError,
		},
		{
			name: "Send Initialize tx" as const,
			isLoading: sendTx2MutationObj.isLoading,
			isUninitialized: sendTx2MutationObj.isUninitialized,
			isSuccess: sendTx2MutationObj.isSuccess,
			isError: sendTx2MutationObj.isError,
		},
	];

	const isSuccess = steps.every(({ isSuccess }) => isSuccess);
	const isError = steps.some(({ isError }) => isError);
	const error =
		generateTxProofForOrganisationDeployMutationObj.error ||
		sendTxMutationObj.error ||
		sendTx2MutationObj.error ||
		generateInitializeTxProofMutationObj.error;
	const isLoading = steps.some(({ isLoading }) => isLoading);
	const isUninitialized = steps.every(
		({ isUninitialized }) => isUninitialized,
	);

	const statusFlags = {
		isSuccess,
		isError: !isSuccess && isError,
		error,
		isLoading: !isSuccess && !isError && isLoading,
		isUninitialized:
			!isSuccess && !isError && !isLoading && isUninitialized,
	};

	const f = async () => {
		const zkAppPrivateKey = PrivateKey.random();
		const originalAccount =
			(await wagmiClient.connectors[0].getAccount()) as string;

		console.log({ originalAccount });

		if (!originalAccount) {
			throw new Error("No wagmi connector found");
		}

		const { proof } = await generateTxProofForOrganisationDeploy({
			zkAppPrivateKeyAsBase58: zkAppPrivateKey.toBase58(),
			feePayerPublicKeyAsBase58: originalAccount,
		}).unwrap();

		const { hash } = await sendTx({
			proof,
		}).unwrap();

		const { proof: proof2 } = await generateInitializeTxProof({
			contractAddress: zkAppPrivateKey.toPublicKey().toBase58(),
			feePayerPublicKeyAsBase58: originalAccount,
		}).unwrap();

		const { hash: hash2 } = await sendTx({
			proof: proof2,
		}).unwrap();

		return {
			txUrl: `https://berkeley.minaexplorer.com/transaction/${hash2}`,
		};
	};

	return { createVesting: f, steps, ...statusFlags };
};

export { useCreateVesting };
