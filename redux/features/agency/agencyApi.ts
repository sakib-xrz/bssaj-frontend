/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

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
      query: (args: any) => {
        const queryString = new URLSearchParams(
          args.reduce(
            (
              acc: Record<string, string>,
              { name, value }: { name: string; value: string }
            ) => {
              if (value) acc[name] = value;
              return acc;
            },
            {} as Record<string, string>
          )
        ).toString();
        return {
          url: `/agencies?${queryString}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.Agency],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAgencyMutation,
  useGetAgencyByIdQuery,
  useUpdateAgencyMutation,
  useGetAgenciesByUserIdQuery,
  useGetAllAgencyQuery,
  useGetMyAgenciesQuery
} = agencyApi;
