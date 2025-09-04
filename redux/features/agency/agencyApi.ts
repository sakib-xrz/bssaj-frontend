/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
interface IQueryItem {
  name: string;
  value: string | number | boolean | undefined;
}
export const agencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAgency: builder.mutation({
      query: (data) => ({
        url: `/agencies`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    getAgencyById: builder.query({
      query: (id) => ({
        url: `/agencies/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Agency],
    }),

    updateAgency: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agencies/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    deleteAgency: builder.mutation({
      query: (id) => ({
        url: `/agencies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    getAgenciesByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `/agencies?creatorId=${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Agency],
    }),

    getMyAgencies: builder.query({
      query: () => ({
        url: `/agencies/my-agency`,
        method: "GET",
      }),
      providesTags: [tagTypes.Agency],
    }),
    getAllAgency: builder.query({
      query: (args: IQueryItem[]) => {
        const params = new URLSearchParams();

        args.forEach(({ name, value }) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            (typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean")
          ) {
            params.append(name, String(value));
          }
        });

        return {
          url: `/agencies?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.Agency],
    }),

    // Success Story Endpoints
    uploadSuccessStory: builder.mutation({
      query: (data) => ({
        url: `/agencies/success-stories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    updateSuccessStory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agencies/success-stories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    deleteSuccessStory: builder.mutation({
      query: (id) => ({
        url: `/agencies/success-stories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Agency],
    }),

    getAgencySuccessStories: builder.query({
      query: (agencyId) => ({
        url: `/agencies/${agencyId}/success-stories`,
        method: "GET",
      }),
      providesTags: [tagTypes.Agency],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAgencyMutation,
  useGetAgencyByIdQuery,
  useUpdateAgencyMutation,
  useDeleteAgencyMutation,
  useGetAgenciesByUserIdQuery,
  useGetAllAgencyQuery,
  useGetMyAgenciesQuery,
  useUploadSuccessStoryMutation,
  useUpdateSuccessStoryMutation,
  useDeleteSuccessStoryMutation,
  useGetAgencySuccessStoriesQuery,
} = agencyApi;
