import { z } from "zod";

const schema = z.object({
	root: z.string(),
});

export { schema };
