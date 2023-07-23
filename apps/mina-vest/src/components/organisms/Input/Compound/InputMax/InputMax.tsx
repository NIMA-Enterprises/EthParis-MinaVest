import * as React from "react";

import { Button } from "@components/molecules/Button";

export const InputMax: React.FC<{
	onClick: React.ComponentProps<typeof Button>["onClick"];
}> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<Button.Text>Max</Button.Text>
		</Button>
	);
};
