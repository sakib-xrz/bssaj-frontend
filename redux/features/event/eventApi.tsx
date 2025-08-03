/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
interface IQueryItem {
    name: string;
    value: string | number | boolean | undefined;
}
export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvent: builder.query({
            query: (args: IQueryItem[]) => {
                const queryString = new URLSearchParams(
                    args.reduce((acc: Record<string, any>, { name, value }) => {
                        if (value !== undefined && value !== null) {
                            acc[name] = value;
                        }
                        return acc;
                    }, {})
                ).toString();

                return {
                    url: `/events?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: [tagTypes.blog],
        }),
        getSinglEvent: builder.query({
            query: (id) => ({
                url: `/events/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.blog],
        }),
    }),
});

export const {
    useGetAllEventQuery,
    useGetSinglEventQuery,
} = eventApi;



