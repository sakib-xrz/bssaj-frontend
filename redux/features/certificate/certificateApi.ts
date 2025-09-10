import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
interface IQueryItem {
  name: string;
  value: string | number | boolean | undefined;
}
export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyCertificate: builder.query({
      query: (sl) => ({
        url: `/certifications/verify/${sl}`,
      }),
      providesTags: [tagTypes.certificate],
    }),
    createCertificate: builder.mutation({
      query: (data) => ({
        url: `/certifications`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.certificate],
    }),
    updateCertificate: builder.mutation({
      query: ({ data, id }) => ({
        url: `/certifications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.certificate],
    }),
    // getAllCartificate: builder.query({
    //   query: () => ({
    //     url: `/certifications/my-agencies`,
    //   }),
    //   providesTags: [tagTypes.certificate],
    // }),
    getAllCartificate: builder.query({
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
          url: `/certifications/my-agencies?${queryString}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.certificate],
    }),
    getSingleCartificate: builder.query({
      query: (id) => ({
        url: `/certifications/${id}`,
      }),
      providesTags: [tagTypes.certificate],
    }),
  }),
});

export const {
  useVerifyCertificateQuery,
  useCreateCertificateMutation,
  useGetAllCartificateQuery,
  useGetSingleCartificateQuery,
  useUpdateCertificateMutation
} = certificateApi;
