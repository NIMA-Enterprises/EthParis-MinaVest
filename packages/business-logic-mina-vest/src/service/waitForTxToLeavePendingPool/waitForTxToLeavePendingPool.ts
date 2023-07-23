import { request } from "graphql-request";

const document = `
query GetBlockHeight($txHash: String!) {
	zkapp(query: { hash: $txHash }) {
		blockHeight
	}
}
`;

const sendQuery = async ({ txHash }: { txHash: string }) => {
	const response = await request(
		"https://berkeley.graphql.minaexplorer.com/",
		document,
		{ txHash },
	);

	return response;
};

const waitForTxToLeavePendingPool = ({ txHash }: { txHash: string }) =>
	new Promise<{ resolved: true }>((resolve, reject) => {
		const intervalId = setInterval(async () => {
			try {
				const response = await sendQuery({ txHash });

				if (response?.zkapp) {
					clearInterval(intervalId);
					resolve({ resolved: true });
				}
			} catch (error) {
				// keep this line
			}
		}, 2000);
	});

export { waitForTxToLeavePendingPool };
