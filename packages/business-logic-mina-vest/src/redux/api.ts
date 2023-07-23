import {
	loadImage,
	loadMultipleImages,
	waitForTxToLeavePendingPool,
} from "../service";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createVesting } from "contract-service-mina-vest/src/workerized";
import { getEndpointCreators } from "get-endpoint-creators";

window.waitForTxToLeavePendingPool = waitForTxToLeavePendingPool;

const minaVestBusinessLogicApi = createApi({
	reducerPath: "minaVestBusinessLogicApi",
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => {
		const { createQuery, createMutation } = getEndpointCreators(builder);

		return {
			createVestingStep1: createMutation(
				createVesting.step1.generateTxProofForOrganisationDeploy,
			),
			createVestingStep2: createMutation(createVesting.step2.sendTx),
			createVestingStep3: createMutation(waitForTxToLeavePendingPool),
			createVestingStep4: createMutation(
				createVesting.step4.generateTxProof,
			),
			createVestingStep5: createMutation(createVesting.step5.sendTx),
			createVestingStep6: createMutation(waitForTxToLeavePendingPool),

			createVestingStep7: createMutation(
				createVesting.step6.generateTxProof,
			),
			createVestingStep8: createMutation(createVesting.step7.sendTx),

			// soft image loading
			loadImage: createQuery(loadImage),
			loadMultipleImages: createQuery(loadMultipleImages),
		};
	},
});

export { minaVestBusinessLogicApi };

export const { useLoadImageQuery, useLoadMultipleImagesQuery } =
	minaVestBusinessLogicApi;
