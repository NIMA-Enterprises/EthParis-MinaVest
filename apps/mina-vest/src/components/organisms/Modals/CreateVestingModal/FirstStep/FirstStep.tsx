import React from "react";

import { FullScreenStepWrapper } from "../../FullScreenStepWrapper";
import { Button } from "@components/molecules";
import { useModalControls } from "@components/organisms/Modal/ModalContext";

const FirstStep: React.FC = () => {
	const { goToNextStep } = useModalControls();

	return (
		<FullScreenStepWrapper>
			<p>first step</p>
			<Button
				onClick={() => {
					goToNextStep();
				}}
			>
				<Button.Text>Next</Button.Text>
			</Button>
		</FullScreenStepWrapper>
	);
};

export { FirstStep };
