"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export function CreateSubscriptionModal({
  isOpen,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) {
  const [formData, setFormData] = useState({
    planName: "",
    billingCycle: "monthly",
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    trialDays: 0,
    serviceLimit: "only 2 service",
    features: [""],
    status: "active",
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const { serviceLimit, ...rest } = formData;
    onCreate({
      ...rest,
      price: Number(rest.price),
      discountPrice: Number(rest.discountPrice),
      discountPercentage: Number(rest.discountPercentage),
      trialDays: Number(rest.trialDays),
      features: [serviceLimit, ...rest.features.filter((f) => f.trim() !== "")],
    });
    setFormData({
      planName: "",
      billingCycle: "monthly",
      price: 0,
      discountPrice: 0,
      discountPercentage: 0,
      trialDays: 0,
      serviceLimit: "only 2 service",
      features: [""],
      status: "active",
    });
    onClose();
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="dark:bg-sidebar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg dark:border-[#F4B057]">
        <div className="dark:bg-sidebar sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <h2 className="text-lg font-semibold text-[#0D2357] dark:text-white">
            Create New Plan
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#0D2357] transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Plan Name
              </label>
              <input
                type="text"
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
                placeholder="e.g. Pro Plan"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Billing Cycle
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Discount Price
              </label>
              <input
                type="number"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Discount Percentage
              </label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Trial Days
              </label>
              <input
                type="number"
                value={formData.trialDays}
                onChange={(e) => setFormData({ ...formData, trialDays: Number(e.target.value) })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                Service Limit
              </label>
              <select
                value={formData.serviceLimit}
                onChange={(e) => setFormData({ ...formData, serviceLimit: e.target.value })}
                className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              >
                <option value="only 2 service">only 2 service</option>
                <option value="only 5 service">only 5 service</option>
                <option value="only 10 service">only 10 service</option>
              </select>
            </div>
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
                Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="dark:bg-sidebar flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
                    placeholder="e.g. Unlimited access"
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

        <div className="dark:bg-sidebar sticky bottom-0 flex justify-end gap-3 border-t border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <button
            onClick={onClose}
            className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0D2357] transition-colors hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
}
