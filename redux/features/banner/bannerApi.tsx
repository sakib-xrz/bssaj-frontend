/* eslint-disable @typescript-eslint/no-explicit-any */
// /auth/me.ts

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const Banner = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: `/banners`,
        method: "GET",
      }),
      providesTags: [tagTypes.banners],
      transformResponse: (response: any) => response.data,
    }),
  }),
  overrideExisting: false,
});


export const { useGetAllBannerQuery } = Banner;


