import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
interface IQueryItem {
  name: string;
  value: string | number | boolean | undefined;
}
export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
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
          url: `/jobs?${queryString}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.jobs],
    }),
    getSingleJobs: builder.query({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.jobs],
    }),
  }),
});

export const { useGetAllJobsQuery ,useGetSingleJobsQuery} = jobApi;
