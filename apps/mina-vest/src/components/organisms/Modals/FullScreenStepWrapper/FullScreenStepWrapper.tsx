import modalBackground from "./modal_background.png";

import React from "react";

const FullScreenStepWrapper: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<div
			className=" w-full h-screen flex flex-col items-center justify-center bg-cover p-6"
			style={{
				backgroundImage: `url(${modalBackground})`,
			}}
		>
			<h1 className="text-center w-full text-[48px] font-bold">
				Create Vesting
			</h1>

			{/* <p className="text-center w-full text-[16px] max-w-[632px] mt-4 mb-12">
				Keep this tab open until all steps have been completed. Please
				note that certain steps might require some time to complete (5-7
				minutes). You can track the progress of each step on the right.
				Your patience is greatly appreciated.
			</p> */}

			{children}
		</div>
	);
};

export { FullScreenStepWrapper };
