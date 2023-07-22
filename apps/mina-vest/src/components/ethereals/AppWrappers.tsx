import type { PropsWithChildren } from "react";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../redux/store";

const AppWrappers: React.FC<PropsWithChildren> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
export { AppWrappers };
