/* eslint-disable @typescript-eslint/no-explicit-any */
// /auth/me.ts

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const GetMe = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query<any, void>({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.getMe],
      transformResponse: (response: any) => response.data,
    }),
  }),
  overrideExisting: false, 
});


export const { useGetAllBannerQuery } = GetMe;


