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

  
    getMemberById: builder.query({
      query: (id) => ({
        url: `/agencies/${id}`,
        method: "GET",
      }),
      providesTags: ["Agency"],
    }),

    
    getAllAgency: builder.query({
      query: () => ({
        url: `/agencies`,
        method: "GET",
      }),
      providesTags: ["Agency"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAgencyMutation,
  useGetMemberByIdQuery,
  useGetAllAgencyQuery,
} = agencyApi;
