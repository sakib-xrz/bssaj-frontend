import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const GalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    geteAllGallery: builder.query({
      query: () => ({
        url: `/gallery`,
        method: "GET",
      }),
      providesTags: [tagTypes.gallery],
    }),
  }),
});

export const { useGeteAllGalleryQuery } = GalleryApi;
