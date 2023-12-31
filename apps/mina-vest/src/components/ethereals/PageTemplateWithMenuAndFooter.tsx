import React from "react";
import { Outlet } from "react-router-dom";

import { Menu } from "@components/organisms/Menu";
import { cx } from "src/utils";

const PageTemplateWithMenuAndFooter = () => {
	const pageClassName = cx("min-h-screen flex flex-col", {
		"debug-screens": import.meta.env.MINAVEST_IS_PROD === "false",
	});

	return (
		<div className={pageClassName}>
			<Menu />
			<div className="flex-grow">
				<Outlet />
			</div>
			{/* <Footer /> */}
		</div>
	);
};

export { PageTemplateWithMenuAndFooter };
