"use client";

import { ManageSubscriptionModal } from "./ManageSubscriptionModal";
import { CreateSubscriptionModal } from "./CreateSubscriptionModal";
import { Check, Crown, Settings, ChevronLeft, ChevronRight, Plus, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useCreateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from "../../../redux/api/subscriptionApi";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API hooks
  const [createSubscriptionPlan] = useCreateSubscriptionPlanMutation();
  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();
  const { data: subscriptionPlansData, isLoading: plansLoading } = useGetSubscriptionPlansQuery({ role: "admin" });

  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleSave = async (updatedPlan: any) => {
    if (updatedPlan.id) {
      const updateData = {
        price: parseFloat(String(updatedPlan.price).replace("$", "")),
        features: updatedPlan.features,
        discountPrice: updatedPlan.discountPrice ? parseFloat(String(updatedPlan.discountPrice).replace("$", "")) : 0,
      };
      
      try {
        await updateSubscriptionPlan({
          subscriptionId: updatedPlan.id,
          role: "admin",
          data: updateData,
        }).unwrap();
      } catch (error) {
        console.error("Failed to save plan:", error);
      }
    }
  };

  const handleCreatePlan = async (data: any) => {
    try {
      await createSubscriptionPlan({
        role: "admin",
        data,
      }).unwrap();
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  return (
    <div className="m-2 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2357] dark:text-white">Subscription Plans</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#0D2357] bg-[#0D2357] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0D2357]/90 dark:border-white dark:bg-white dark:text-[#0D2357] dark:hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            Create Plan
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pt-10 pb-5 md:grid-cols-2 lg:grid-cols-3">
        {plansLoading ? (
          <div className="col-span-full py-10 text-center text-[#0D2357] dark:text-white">
            Loading plans...
          </div>
        ) : (
          subscriptionPlansData?.data?.map((plan: any) => {
            const isBestValue =
              plan.billingCycle === "yearly" || plan.billingCycle === "year" || plan.discountPercentage > 0;
            const currentPrice =
              plan.discountPrice > 0 && plan.discountPrice < plan.price ? plan.discountPrice : plan.price;
            const originalPrice = plan.price;

            return (
              <div
                key={plan._id}
                className={`dark:bg-sidebar relative rounded-lg border bg-white p-6 transition-all hover:shadow-md ${
                  isBestValue
                    ? "border-2 border-[#F4B057] shadow-lg hover:shadow-xl"
                    : "border-[#E2E8F0] shadow-sm dark:border-[#F4B057]"
                }`}
              >
                {isBestValue && (
                  <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#F4B057] px-3 py-1 text-xs font-medium text-white">
                    <Crown className="h-3 w-3" />
                    Best Value
                  </div>
                )}
                
                <button
                  onClick={() => {
                    setSelectedPlan({
                      id: plan._id,
                      name: plan.planName,
                      price: typeof plan.price === "number" ? `$${plan.price}` : plan.price,
                      discountPrice: typeof plan.discountPrice === "number" ? `$${plan.discountPrice}` : plan.discountPrice || "$0",
                      cycle: plan.billingCycle,
                      features: plan.features || [],
                    });
                    setIsModalOpen(true);
                  }}
                  className={`absolute right-4 ${isBestValue ? "top-8" : "top-4"} text-[#0D2357] hover:text-[#F4B057] transition-colors dark:text-white dark:hover:text-[#F4B057]`}
                >
                  <Pencil className="h-5 w-5" />
                </button>

                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{plan.planName}</h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#0D2357] dark:text-white">
                      ${currentPrice}
                    </span>
                    <span className="text-sm text-[#0D2357]/70 dark:text-white/70">
                      / {plan.billingCycle}
                    </span>
                  </div>
                  {plan.discountPrice > 0 && plan.price > plan.discountPrice && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[#0D2357]/50 line-through dark:text-white/50">
                        ${originalPrice}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Save ${Number(originalPrice - currentPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-[#0D2357] dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>

     

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, 8)} of 8 users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.ceil(8 / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors ${
                    currentPage === page
                      ? "border-[#F4B057] bg-[#F4B057] text-white"
                      : "dark:bg-sidebar border-[#E2E8F0] bg-white text-[#0D2357] hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(8 / itemsPerPage)))
                }
                disabled={currentPage === Math.ceil(8 / itemsPerPage)}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ManageSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        onSave={handleSave}
      />

      <CreateSubscriptionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePlan}
      />
    </div>
  );
};

export default Subscription;
