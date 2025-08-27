
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const Payment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyPayment: builder.query({
      query: (id) => ({
        url: `/payments/agency/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payments],
    }),
  }),
  overrideExisting: false,
});


export const { useGetAgencyPaymentQuery } = Payment;


