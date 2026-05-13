import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: ({ role }) => ({
        url: "/subscription/get-all-subscriptions",
        method: "GET",
        params: { role },
      }),
      providesTags: ["subscription"],
    }),
    createSubscriptionPlan: builder.mutation({
      query: ({ role, data }) => ({
        url: "/subscription/create-subscription",
        method: "POST",
        params: { role },
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
    updateSubscriptionPlan: builder.mutation({
      query: ({ subscriptionId, role, data }) => ({
        url: "subscription/update-subscription-plan",
        method: "PATCH",
        // Send both casings to be safe
        params: { subscriptionId, role },
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
} = subscriptionApi;

export default subscriptionApi;
