import * as React from "react";

import { Icon } from "@components/atoms/Icon";
import { cx } from "src/utils";

const InputIcon: typeof Icon = (props) => {
	const { className, ...rest } = props;
	return <Icon className={cx("h-6 w-6 stroke-black", className)} {...rest} />;
};

export { InputIcon };
