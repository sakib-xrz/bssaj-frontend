/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const agencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAgency: builder.mutation({
      query: (data) => ({
        url: `/agencies`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agency"],
    }),

    getAgencyById: builder.query({
      query: (id) => ({
        url: `/agencies/${id}`,
        method: "GET",
      }),
      providesTags: ["Agency"],
    }),

    updateAgency: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agencies/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Agency"],
    }),

    getAgenciesByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `/agencies?creatorId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Agency"],
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
      providesTags: ["Agency"],
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
} = agencyApi;
