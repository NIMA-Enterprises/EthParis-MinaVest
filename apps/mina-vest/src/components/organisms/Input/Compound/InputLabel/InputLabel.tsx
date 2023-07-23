import * as React from "react";

const InputLabel: React.FC<{
	name: string;
}> = ({ name }) => {
	return (
		<label
			className="text-paragraph text-mina-black hover:cursor-pointer"
			htmlFor={name}
		>
			{name}
		</label>
	);
};

export { InputLabel };
