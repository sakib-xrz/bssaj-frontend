import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsultations: builder.query({
      query: (arg) => {
        return {
          url: `/consultations`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.consultation],
    }),
    getConsultationById: builder.query({
      query: (id) => ({
        url: `/consultations/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.consultation],
    }),
    createConsultation: builder.mutation({
      query: (data) => ({
        url: `/consultations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.consultation],
    }),
    updateConsultationStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/consultations/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.consultation],
    }),
    deleteConsultation: builder.mutation({
      query: (id) => ({
        url: `/consultations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.consultation],
    }),
  }),
});

export const {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useCreateConsultationMutation,
  useUpdateConsultationStatusMutation,
  useDeleteConsultationMutation,
} = consultationApi;
