import React from "react";

import { configureModalManager } from "@components/organisms";
import { CreateVestingModal } from "@components/organisms/Modals/CreateVestingModal/CreateVestingModal";

const { ModalManager, useModalManager } = configureModalManager([
	CreateVestingModal,
]);

const ModalsWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
	<ModalManager>{children}</ModalManager>
);

export { ModalsWrapper, useModalManager };
