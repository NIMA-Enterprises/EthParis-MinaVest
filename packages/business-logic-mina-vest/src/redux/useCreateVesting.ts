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

	const [
		waitForTxToLeavePendingPool,
		waitForTxToLeavePendingPoolMutationObj,
	] = minaVestBusinessLogicApi.useCreateVestingStep3Mutation({
		fixedCacheKey: "useCreateVestingStep3Mutation",
	});

	const [generateInitializeTxProof, generateInitializeTxProofMutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep4Mutation({
			fixedCacheKey: "useCreateVestingStep4Mutation",
		});

	const [sendTx2, sendTx2MutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep5Mutation({
			fixedCacheKey: "useCreateVestingStep5Mutation",
		});

	const [
		waitForTxToLeavePendingPool2,
		waitForTxToLeavePendingPoolMutationObj2,
	] = minaVestBusinessLogicApi.useCreateVestingStep6Mutation({
		fixedCacheKey: "useCreateVestingStep6Mutation",
	});

	const [generateAddUserTxProof, generateAddUserTxProofMutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep7Mutation({
			fixedCacheKey: "useCreateVestingStep7Mutation",
		});

	const [sendTx3, sendTx3MutationObj] =
		minaVestBusinessLogicApi.useCreateVestingStep8Mutation({
			fixedCacheKey: "useCreateVestingStep8Mutation",
		});

	React.useEffect(() => {
		return () => {
			generateTxProofForOrganisationDeployMutationObj.reset();
			sendTxMutationObj.reset();
			waitForTxToLeavePendingPoolMutationObj.reset();
			generateInitializeTxProofMutationObj.reset();
			sendTx2MutationObj.reset();
			waitForTxToLeavePendingPoolMutationObj2.reset();
			generateAddUserTxProofMutationObj.reset();
			sendTx3MutationObj.reset();
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
			name: "Send organisation deploy tx" as const,
			isLoading: sendTxMutationObj.isLoading,
			isUninitialized: sendTxMutationObj.isUninitialized,
			isSuccess: sendTxMutationObj.isSuccess,
			isError: sendTxMutationObj.isError,
		},
		{
			name: "Wait for deploy tx to leave pending pool" as const,
			isLoading: waitForTxToLeavePendingPoolMutationObj.isLoading,
			isUninitialized:
				waitForTxToLeavePendingPoolMutationObj.isUninitialized,
			isSuccess: waitForTxToLeavePendingPoolMutationObj.isSuccess,
			isError: waitForTxToLeavePendingPoolMutationObj.isError,
		},
		{
			name: "Generate proof for organisation initialize" as const,
			isLoading: generateInitializeTxProofMutationObj.isLoading,
			isUninitialized:
				generateInitializeTxProofMutationObj.isUninitialized,
			isSuccess: generateInitializeTxProofMutationObj.isSuccess,
			isError: generateInitializeTxProofMutationObj.isError,
		},
		{
			name: "Send initialize tx" as const,
			isLoading: sendTx2MutationObj.isLoading,
			isUninitialized: sendTx2MutationObj.isUninitialized,
			isSuccess: sendTx2MutationObj.isSuccess,
			isError: sendTx2MutationObj.isError,
		},
		{
			name: "Wait for initialize tx to leave pending pool" as const,
			isLoading: waitForTxToLeavePendingPoolMutationObj2.isLoading,
			isUninitialized:
				waitForTxToLeavePendingPoolMutationObj2.isUninitialized,
			isSuccess: waitForTxToLeavePendingPoolMutationObj2.isSuccess,
			isError: waitForTxToLeavePendingPoolMutationObj2.isError,
		},
		{
			name: "Add user proof generation" as const,
			isLoading: generateAddUserTxProofMutationObj.isLoading,
			isUninitialized: generateAddUserTxProofMutationObj.isUninitialized,
			isSuccess: generateAddUserTxProofMutationObj.isSuccess,
			isError: generateAddUserTxProofMutationObj.isError,
		},
		{
			name: "Send add user tx" as const,
			isLoading: sendTx3MutationObj.isLoading,
			isUninitialized: sendTx3MutationObj.isUninitialized,
			isSuccess: sendTx3MutationObj.isSuccess,
			isError: sendTx3MutationObj.isError,
		},
	];

	const isSuccess = steps.every(({ isSuccess }) => isSuccess);
	const isError = steps.some(({ isError }) => isError);
	const error =
		generateTxProofForOrganisationDeployMutationObj.error ||
		sendTxMutationObj.error ||
		sendTx2MutationObj.error ||
		generateInitializeTxProofMutationObj.error ||
		waitForTxToLeavePendingPoolMutationObj.error ||
		waitForTxToLeavePendingPoolMutationObj2.error ||
		generateAddUserTxProofMutationObj.error ||
		sendTx3MutationObj.error;
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
		// const zkAppPrivateKey = PrivateKey.fromBase58(
		// 	"EKE4vQTy7MG86yTbXcGhp7u8fwy3CvcYCc99Bpj9Gf3uvwRwtpdD",
		// );
		const zkAppPrivateKey = PrivateKey.random();
		const originalAccount =
			(await wagmiClient.connectors[0].getAccount()) as string;

		console.log({
			originalAccount,
			zkAppPrivateKey: zkAppPrivateKey.toBase58(),
		});

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

		await waitForTxToLeavePendingPool({
			txHash: hash,
		}).unwrap();

		const { proof: proof2 } = await generateInitializeTxProof({
			contractAddress: zkAppPrivateKey.toPublicKey().toBase58(),
			feePayerPublicKeyAsBase58: originalAccount,
			zkAppPrivateKeyAsBase58: zkAppPrivateKey.toBase58(),
		}).unwrap();

		const { hash: hash2 } = await sendTx2({
			proof: proof2,
		}).unwrap();

		await waitForTxToLeavePendingPool2({
			txHash: hash2,
		}).unwrap();

		const { proof: proof3 } = await generateAddUserTxProof({
			contractAddress: zkAppPrivateKey.toPublicKey().toBase58(),
			feePayerPublicKeyAsBase58: originalAccount,
		}).unwrap();

		const { hash: hash3 } = await sendTx3({
			proof: proof3,
		}).unwrap();

		return {
			txUrl: `https://berkeley.minaexplorer.com/transaction/${hash3}`,
		};
	};

	return { createVesting: f, steps, ...statusFlags };
};

export { useCreateVesting };
