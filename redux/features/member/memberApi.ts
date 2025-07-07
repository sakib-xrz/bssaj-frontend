import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: (query) => ({
        url: `/members`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.member],
    }),
    getMemberById: builder.query({
      query: (id) => ({
        url: `/members/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.member],
    }),
    getMemberStats: builder.query({
      query: () => ({
        url: `/members/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.member],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useGetMemberStatsQuery,
} = memberApi;
