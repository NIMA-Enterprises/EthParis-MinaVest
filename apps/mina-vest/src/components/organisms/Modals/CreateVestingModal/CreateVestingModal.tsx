import React from "react";

import { CreateVestingTransactionStep } from "./CreateVestingTransactionStep";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { Modal } from "@components/organisms/Modal/Modal";
import type { IModal } from "@components/organisms/Modal/ModalManager";
import type { GetEndpointArgType } from "src/redux/store";

const CreateVestingModal: IModal<"CreateVestingModal"> = () => {
	return (
		<Modal className="relative w-full overflow-hidden rounded-xl bg-white ">
			<Modal.Step>
				<FirstStep />
			</Modal.Step>
			<Modal.Step>
				<SecondStep />
			</Modal.Step>
			<Modal.Step>
				<CreateVestingTransactionStep />
			</Modal.Step>
		</Modal>
	);
};

CreateVestingModal.modalName = "CreateVestingModal";

export { CreateVestingModal };
