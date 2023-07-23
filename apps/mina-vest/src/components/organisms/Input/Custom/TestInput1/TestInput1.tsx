import React from "react";

import { Input } from "../../Input";

const TestInput1: React.FC<{
	isValid: boolean;
	errorMessage?: string;
	className?: React.ComponentPropsWithoutRef<typeof Input>["className"];
	value: React.ComponentPropsWithoutRef<typeof Input>["value"];
	setValue: React.ComponentPropsWithoutRef<typeof Input>["setValue"];
}> = ({ value, setValue, errorMessage = "", className }) => {
	const name = "Your name";
	return (
		<Input
			type="password"
			value={value}
			setValue={setValue}
			placeholder="Jane Doe..."
			name={name}
			wrapperClassName={className}
		>
			<Input.Icon type="CART" />
			<Input.Label name={name} />
			<Input.Button
				type="primary"
				disabled
				onClick={() => {
					console.log("send");
				}}
			>
				<Input.Button.Text>Send</Input.Button.Text>
				<Input.Button.Icon
					type="ARROW_RIGHT"
					className="h-5 w-5 stroke-white"
				/>
			</Input.Button>
			{/* <Input.Currency>MINA</Input.Currency> */}
			{/* <Input.Status
				name=""
				// size={Input.Status.Size.MEDIUM}
				// color={Input.Status.Color.PRIMARY}
			>
				{errorMessage}
			</Input.Status> */}
		</Input>
	);
};

export { TestInput1 };
