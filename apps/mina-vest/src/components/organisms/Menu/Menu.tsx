import React from "react";
import { useLocation } from "react-router-dom";

import { PageSection } from "@components/atoms/PageSection";
import { cx } from "src/utils";
import { ConnectButton } from "wallet-connection";

const Menu = () => {
	const { pathname } = useLocation();
	return (
		<PageSection
			fullWidth
			className={cx("pt-3", {
				"bg-mina-light-grey": pathname !== "/",
				"bg-transparent": pathname === "/",
			})}
		>
			<PageSection className="flex justify-end">
				<ConnectButton />
			</PageSection>
		</PageSection>
	);
};

export { Menu };
