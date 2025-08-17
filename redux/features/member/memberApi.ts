import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
interface IQueryItem {
  name: string;
  value: string | number | boolean | undefined;
}
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
      query: (args: IQueryItem[]) => {
        const queryString = new URLSearchParams(
          args.reduce((acc: Record<string, any>, { name, value }) => {
            if (value !== undefined && value !== null) {
              acc[name] = value;
            }
            return acc;
          }, {})
        ).toString();

        return {
          url: `/members?${queryString}`,
          method: "GET",
        };
      },
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
