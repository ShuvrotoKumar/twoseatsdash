import { baseApi } from "./baseApi";

const aboutusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getAboutUs: builder.query({
      query: () => ({
        url: "/legalDoc/get-doc/aboutUs",
        method: "GET",
      }),
      providesTags: ["aboutUs"],
    }),
    updateAboutUs: builder.mutation({
      query: ({ requestData }) => ({
        url: "/legalDoc/create-doc/aboutUs",
        method: "PATCH",
        body: requestData,
      }),
      invalidatesTags: ["aboutUs"],
    }),
  }),
});

export const {
    useGetAboutUsQuery,
    useUpdateAboutUsMutation,
} = aboutusApi;
