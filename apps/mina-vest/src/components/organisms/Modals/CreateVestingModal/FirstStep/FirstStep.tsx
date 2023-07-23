import minaLogo from "./mina_logo.png";

import React from "react";

import { FullScreenStepWrapper } from "../../FullScreenStepWrapper";
import { Icon } from "@components/atoms";
import { Button } from "@components/molecules";
import { Input } from "@components/organisms/Input";
import { TestInput1 } from "@components/organisms/Input/Custom/TestInput1";
import { useModalControls } from "@components/organisms/Modal/ModalContext";

const FirstStep: React.FC = () => {
	const { goToNextStep } = useModalControls();

	const [receiverAddress, setReceiverAddress] = React.useState<string>("");

	const isValid = receiverAddress !== "";

	return (
		<FullScreenStepWrapper>
			<div className="w-full max-w-[400px] flex flex-col gap-3 mt-5">
				<Input
					type="text"
					value={receiverAddress}
					setValue={setReceiverAddress}
					placeholder="Address..."
					name="Add User Address"
					// wrapperClassName={className}
				>
					<Input.Label name="Add User Address" />
				</Input>
				<div className="opacity-75  hover:cursor-not-allowed">
					<p className="text-mina-black text-paragraph">
						Select token
					</p>
					<div className="bg-mina-white mt-2 h-14 p-3 flex items-center gap-3 border-mina-grey border">
						<img
							src={minaLogo}
							alt=""
							className="w-6 h-6 rounded-full"
						/>
						<p className="text-mina-black text-paragraph grow">
							MINA
						</p>
						<Icon
							type="ARROW_DOWN"
							className="stroke-mina-black w-5 h-5"
						/>
					</div>
				</div>
				<div className="opacity-75  hover:cursor-not-allowed">
					<p className="text-mina-black text-paragraph">
						Select Template
					</p>
					<div className="bg-mina-white mt-2 h-14 p-3 flex items-center gap-3 border-mina-grey border">
						<Icon
							type="LIST"
							className="w-6 h-6 stroke-mina-black "
						/>
						<p className="text-mina-black text-paragraph grow">
							Monthly Vesting
						</p>
						<Icon
							type="ARROW_DOWN"
							className="stroke-mina-black w-5 h-5"
						/>
					</div>
				</div>
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

export { FirstStep };
