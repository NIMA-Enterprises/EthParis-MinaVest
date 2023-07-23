import React from "react";

import { FullScreenStepWrapper } from "../../FullScreenStepWrapper";
import { Icon } from "@components/atoms";
import { Button } from "@components/molecules";
import { Input } from "@components/organisms/Input";
import { InputCurrency } from "@components/organisms/Input/Compound";
import { useModalControls } from "@components/organisms/Modal/ModalContext";

const SecondStep: React.FC = () => {
	const { goToNextStep } = useModalControls();

	const [amount, setAmount] = React.useState<string>("");
	const [startingDate, setStartingDate] = React.useState<string>("");
	const [numberOfMonths, setNumberOfMonths] = React.useState<string>("");

	const isValid =
		amount !== "" && startingDate !== "" && numberOfMonths !== "";

	return (
		<FullScreenStepWrapper>
			<div className="w-full max-w-[400px] flex flex-col gap-3 mt-5">
				<Input
					type="text"
					value={amount}
					setValue={setAmount}
					placeholder="0"
					name="Amount"
					// wrapperClassName={className}
				>
					<Input.Label name="Amount" />
					<InputCurrency>MINA</InputCurrency>
				</Input>
				<Input
					type="text"
					value={startingDate}
					setValue={setStartingDate}
					placeholder="Starting Date..."
					name="Starting Date (UNIX timestamp)"
					// wrapperClassName={className}
				>
					<Input.Label name="Starting Date (UNIX timestamp)" />
				</Input>
				<Input
					type="text"
					value={numberOfMonths}
					setValue={setNumberOfMonths}
					placeholder="0"
					name="No. of Months"
					// wrapperClassName={className}
				>
					<Input.Label name="No. of Months" />
				</Input>
				<Button
					className="self-end"
					disabled={!isValid}
					onClick={() => {
						goToNextStep();
					}}
				>
					<Button.Text>Next</Button.Text>
				</Button>
			</div>
		</FullScreenStepWrapper>
	);
};

export { SecondStep };
