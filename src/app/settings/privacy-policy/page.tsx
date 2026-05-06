"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useGetPrivacyQuery, useUpdatePrivacyMutation } from "../../../../redux/api/privacyApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { data: apiResponse, isLoading: isFetching } = useGetPrivacyQuery({});
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdatePrivacyMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (apiResponse?.data?.description) {
      setContent(apiResponse.data.description);
    }
  }, [apiResponse]);

  const handleSave = async () => {
    try {
      await updatePrivacy({
        requestData: {
          description: content,
        },
      }).unwrap();
      toast.success("Privacy Policy saved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save Privacy Policy");
      console.error("Failed to save privacy policy:", err);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card relative p-6">
        {isFetching && (
          <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write privacy policy..."
        />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center p-4 sm:flex-row">
        <Button
          onClick={handleSave}
          disabled={isUpdating || isFetching}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </div>
  );
}
