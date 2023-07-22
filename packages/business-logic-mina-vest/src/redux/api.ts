import { loadImage, loadMultipleImages } from "../service";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEndpointCreators } from "get-endpoint-creators";

const minaVestBusinessLogicApi = createApi({
	reducerPath: "minaVestBusinessLogicApi",
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => {
		const { createQuery, createMutation } = getEndpointCreators(builder);

		return {
			// soft image loading
			loadImage: createQuery(loadImage),
			loadMultipleImages: createQuery(loadMultipleImages),
		};
	},
});

export { minaVestBusinessLogicApi };

export const { useLoadImageQuery, useLoadMultipleImagesQuery } =
	minaVestBusinessLogicApi;
