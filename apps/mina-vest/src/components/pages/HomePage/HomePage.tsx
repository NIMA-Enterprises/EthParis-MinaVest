import React from "react";

import { Icon, Tooltip } from "@components/atoms";
import { useModalManager } from "@components/ethereals/ModalsWrapper";
import { Menu } from "@components/organisms/Menu";
import { formatPrice } from "formatting-service";

const HomePage = () => {
	const testNumber = 1.2323232323;
	const formattedTestNumber = formatPrice({ num: testNumber });

	const { modalManager } = useModalManager();
	return (
		<div>
			<Menu />
			<p>Home</p>
			<Tooltip
				copy={testNumber.toString()}
				content={testNumber}
				placement="top"
			>
				<span className="flex gap-1 font-bold">
					{formattedTestNumber}
					<Icon type="COPY" className="w-4 stroke-black" />
				</span>
			</Tooltip>
			<button
				onClick={() => {
					modalManager.open("CreateVestingModal", undefined);
				}}
			>
				deploy
			</button>
		</div>
	);
};

export { HomePage };
