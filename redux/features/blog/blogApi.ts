import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

interface IQueryItem {
  name: string;
  value: string | number | boolean | undefined;
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
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
          url: `/blogs?${queryString}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: builder.mutation({
      query: ({ id, isHardDelete = false }) => ({
        url: `/blogs/${id}?hard_delete=${isHardDelete}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    approveOrRejectBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/approve-reject-blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useApproveOrRejectBlogMutation,
} = blogApi;
