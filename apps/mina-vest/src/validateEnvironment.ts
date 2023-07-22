import { z } from "zod";

const schema = z.object({
	MINAVEST_IS_PROD: z.string(),
	WALLET_CONNECTION_IS_PROD: z.string(),
});

const validateEnvironment = () => {
	schema.passthrough().parse(import.meta.env);
};

export { validateEnvironment };
