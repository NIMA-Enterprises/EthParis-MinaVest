import { schema } from "./schema";
import { buildMap } from "contract-service-mina-vest/src/pure";
import { createRequestQueryFunction } from "query-function-creators";
import { Field } from "snarkyjs";

const getVerifiedKeysRoot = createRequestQueryFunction({
	getAxiosRequestConfig: () => ({
		url: `${
			import.meta.env.BACKEND_SERVICE_VOTE_BASE_URL
		}/get-verified-keys-root`,
		method: "post",
	}),
	schema,
	getMockedData: async () => {
		const { map } = buildMap([
			{
				publicKeyAsBase58: "",
				value: Field(1),
			},
		]);

		const root = map.getRoot().toJSON();

		return {
			root,
		};
	},
	isMockingEnabled: true,
});

export { getVerifiedKeysRoot };
