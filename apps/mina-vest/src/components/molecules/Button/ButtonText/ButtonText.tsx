import React from "react";

import { useButtonContext } from "../ButtonContext";
import { cx } from "src/utils";

const ButtonText: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { size, type } = useButtonContext();
	const textClassname = cx(
		"text-white font-semibold  tracking-wider ",
		type === "ghost" && " text-mina-orange",
		type === "outline" && " text-slate-700",
		// sizes
		size === "md" && " text-base",
		size === "sm" && " text-sm",
	);

	return (
		<span
			className={textClassname}
			// className="text-sm"
		>
			{children}
		</span>
	);
};

export { ButtonText };
