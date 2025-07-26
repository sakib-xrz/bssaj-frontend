import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMember: builder.mutation({
      query: (data) => ({
        url: `/members`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.member],
    }),
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
    getOwnMember: builder.query({
      query: () => ({
        url: "/members/me",
      }),
      providesTags: [tagTypes.member],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useGetMemberStatsQuery,
  useCreateMemberMutation,
  useGetOwnMemberQuery,
} = memberApi;
