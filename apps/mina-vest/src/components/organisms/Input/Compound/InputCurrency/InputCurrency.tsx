import * as React from "react";

const InputCurrency: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className="self-center pr-6 text-lg font-bold text-gray-600">
			{children}
		</div>
	);
};

export { InputCurrency };
