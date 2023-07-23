import * as React from "react";

import { Button } from "@components/molecules/Button";

const InputButton: typeof Button = (props) => {
	return <Button {...props} />;
};

InputButton.Icon = Button.Icon;
InputButton.Text = Button.Text;

export { InputButton };
