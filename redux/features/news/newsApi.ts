import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: (params) => ({
        url: `/news`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.News],
    }),
    getSingleNews: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.News],
    }),
    createNews: builder.mutation({
      query: (data) => ({
        url: `/news`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.News],
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.News],
    }),
    deleteNews: builder.mutation({
      query: ({ id, isHardDelete = false }) => ({
        url: `/news/${id}?hard_delete=${isHardDelete}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.News],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
