"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Plan {
  name: string;
  price: string | number;
  discountPrice?: string | number;
  cycle: string;
  features: string[];
}

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onSave: (plan: Plan) => void;
}

export function ManageSubscriptionModal({
  isOpen,
  onClose,
  plan,
  onSave,
}: ManageSubscriptionModalProps) {
  const [editedPlan, setEditedPlan] = useState<Plan | null>(null);

  // Update internal state when plan changes
  useEffect(() => {
    if (plan) {
      setEditedPlan(plan);
    }
  }, [plan]);

  if (!isOpen || !editedPlan) return null;

  const handleSave = () => {
    if (editedPlan) {
      onSave(editedPlan);
    }
    onClose();
  };

  const addFeature = () => {
    setEditedPlan({ ...editedPlan, features: [...editedPlan.features, ""] });
  };

  const removeFeature = (index: number) => {
    setEditedPlan({
      ...editedPlan,
      features: editedPlan.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...editedPlan.features];
    newFeatures[index] = value;
    setEditedPlan({ ...editedPlan, features: newFeatures });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="dark:bg-sidebar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg dark:border-[#F4B057]">
        <div className="dark:bg-sidebar sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <h2 className="text-lg font-semibold text-[#0D2357] dark:text-white">
            Manage Subscription Plan
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#0D2357] transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-[#E2E8F0] p-4 dark:border-[#F4B057]/30">
            <h3 className="mb-4 text-base font-semibold text-[#0D2357] dark:text-white">
              Plan Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Price
                </label>
                <input
                  type="text"
                  value={editedPlan.price}
                  onChange={(e) => setEditedPlan({ ...editedPlan, price: e.target.value })}
                  className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Discount Price
                </label>
                <input
                  type="text"
                  value={editedPlan.discountPrice || ""}
                  onChange={(e) => setEditedPlan({ ...editedPlan, discountPrice: e.target.value })}
                  className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0D2357] dark:text-white">
                    Features
                  </label>
                  <button
                    onClick={addFeature}
                    className="flex items-center gap-1 rounded-md bg-[#F4B057] px-2 py-1 text-xs text-white hover:bg-[#F4B057]/90"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {editedPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="dark:bg-sidebar flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dark:bg-sidebar sticky bottom-0 flex justify-end gap-3 border-t border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <button
            onClick={onClose}
            className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0D2357] transition-colors hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
