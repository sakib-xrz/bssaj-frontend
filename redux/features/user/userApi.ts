import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => ({
        url: `/users`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    searchUsers: builder.query({
      query: (query) => ({
        url: `/users/search`,
        method: "GET",
        params: query,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateProfilePitcher: builder.mutation({
      query: (data) => ({
        url: `/users/profile-picture`,
        method: "PATCH",
        body:data
      }),
      invalidatesTags: [tagTypes.getMe],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useSearchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateProfilePitcherMutation
} = userApi;
