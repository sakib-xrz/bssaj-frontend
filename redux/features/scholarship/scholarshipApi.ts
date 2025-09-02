import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const scholarshipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getScholarships: builder.query({
      query: (arg) => ({
        url: `/scholarships`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.scholarship],
    }),
    getScholarshipById: builder.query({
      query: (id) => ({
        url: `/scholarships/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.scholarship],
    }),
    createScholarship: builder.mutation({
      query: (data) => ({
        url: `/scholarships`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.scholarship],
    }),
    updateScholarship: builder.mutation({
      query: ({ id, data }) => ({
        url: `/scholarships/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.scholarship],
    }),
    deleteScholarship: builder.mutation({
      query: (id) => ({
        url: `/scholarships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.scholarship],
    }),
  }),
});

export const {
  useGetScholarshipsQuery,
  useGetScholarshipByIdQuery,
  useCreateScholarshipMutation,
  useUpdateScholarshipMutation,
  useDeleteScholarshipMutation,
} = scholarshipApi;
