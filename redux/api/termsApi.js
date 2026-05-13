import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/legalDoc/get-doc/termsAndCondition",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ requestData }) => ({
        url: "/legalDoc/create-doc/termsAndCondition",
        method: "PATCH",
        body: requestData,
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionsApi;
