"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useGetAboutUsQuery, useUpdateAboutUsMutation } from "../../../../redux/api/aboutusApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function AboutUsPage() {
  const router = useRouter();
  const { data: apiResponse, isLoading: isFetching } = useGetAboutUsQuery({});
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (apiResponse?.data?.description) {
      setContent(apiResponse.data.description);
    }
  }, [apiResponse]);

  const handleSave = async () => {
    try {
      await updateAboutUs({
        requestData: {
          description: content,
        },
      }).unwrap();
      alert("About Us saved!");
    } catch (err) {
      console.error("Failed to save about us:", err);
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
          <h2 className="text-xl font-semibold">About Us</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card relative p-6">
        {isFetching && (
          <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        <TiptapEditor content={content} onChange={setContent} placeholder="Write about us..." />
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
