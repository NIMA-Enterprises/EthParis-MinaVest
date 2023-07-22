import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { minaVestBusinessLogicApi } from "business-logic-mina-vest";

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[minaVestBusinessLogicApi.reducerPath]:
			minaVestBusinessLogicApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(minaVestBusinessLogicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type GetEndpointReturnType<
	Key extends keyof typeof minaVestBusinessLogicApi["endpoints"],
> = typeof minaVestBusinessLogicApi["endpoints"][Key]["Types"]["ResultType"];

export type GetEndpointArgType<
	Key extends keyof typeof minaVestBusinessLogicApi["endpoints"],
> = typeof minaVestBusinessLogicApi["endpoints"][Key]["Types"]["QueryArg"];
