import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyCertificate: builder.query({
      query: (sl) => ({
        url: `/certifications/verify/${sl}`,
      }),
      providesTags: [tagTypes.certificate],
    }),
  }),
});

export const { useVerifyCertificateQuery } = certificateApi;
