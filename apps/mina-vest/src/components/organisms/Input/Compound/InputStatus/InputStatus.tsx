import * as React from "react";

const InputStatus: React.FC<{
	name: string;
}> = ({ name }) => {
	return <label htmlFor={name}>{name}</label>;
};

export { InputStatus };
