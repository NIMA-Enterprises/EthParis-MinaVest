import React from "react";

import { Icon } from "@components/atoms";
import { useModalManager } from "@components/ethereals/ModalsWrapper";
import { Button } from "@components/molecules";
import { cx } from "src/utils";

const CreateVestingBox = ({ className }: { className?: string }) => {
	const { modalManager } = useModalManager();
	return (
		<div
			className={cx(
				"bg-card-gradient w-full p-6 rounded-3xl border border-mina-grey solid max-w-lg flex flex-col items-center",
				className,
			)}
		>
			<Icon type="PACKAGE_PLUS" className="stroke-mina-black w-12 h-12" />
			<h2 className="text-h2 text-mina-black mt-4">New Vesting</h2>

			<p className="text-small text-mina-black mt-2">
				Get started by creating a new vesting.
			</p>
			<Button
				className="mt-6"
				onClick={() => modalManager.open("CreateVestingModal", {})}
			>
				<Button.Icon
					type="PLUS_SQUARE"
					className="stroke-mina-white w-5 h-5"
				/>
				<Button.Text>Create Vesting</Button.Text>
			</Button>
		</div>
	);
};

export { CreateVestingBox };
