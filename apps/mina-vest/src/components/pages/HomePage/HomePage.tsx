import React from "react";

import { Icon, Tooltip } from "@components/atoms";
import { PageSection } from "@components/atoms/PageSection";
import { useModalManager } from "@components/ethereals/ModalsWrapper";
import { CreateVestingBox } from "@components/organisms/CreateVestingBox";
import { Menu } from "@components/organisms/Menu";
import { formatPrice } from "formatting-service";

const HomePage = () => {
	return (
		<PageSection className="flex flex-col items-center">
			<Menu />
			<CreateVestingBox className="mt-8" />
		</PageSection>
	);
};

export { HomePage };
