import React from "react";

import { TransactionStatusStep } from "../TransactionStatusStep";
import { useModalManager } from "@components/ethereals/ModalsWrapper";
import { useCreateVesting } from "business-logic-mina-vest";

const CreateVestingTransactionStep: React.FC = () => {
	const { modalManager } = useModalManager();
	const {
		createVesting,
		steps,
		isLoading,
		isUninitialized,
		isError,
		isSuccess,
		error,
	} = useCreateVesting();

	return (
		<TransactionStatusStep
			name="CreateVestingModal"
			onClose={() => {
				modalManager.close("CreateVestingModal");
			}}
			startMutation={async () => {
				const { txUrl } = await createVesting();

				return { txUrl };
			}}
			steps={steps}
			isError={isError}
			isSuccess={isSuccess}
			isLoading={isLoading}
			isUninitialized={isUninitialized}
			error={error}
		/>
	);
};

export { CreateVestingTransactionStep };
