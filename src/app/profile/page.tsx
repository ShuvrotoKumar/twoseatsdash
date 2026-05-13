"use client";

import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateAdminPersonalInfoMutation } from "../../../redux/api/profileApi";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { setUser } from "../../../redux/Slice/authSlice";
import { getImageUrl } from "../../../config/envConfig";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateAdminPersonalInfoMutation();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(getImageUrl(user?.image || ""));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (user && !selectedFile) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAvatar(user.image ? getImageUrl(user.image) : "");
    }
  }, [user, selectedFile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      updateProfile(formData)
        .unwrap()
        .then((res) => {
          toast.success("Profile updated successfully!");
          setSelectedFile(null); // Clear selected file after success
          // Update the user in Redux store if the API returns the updated user
          if (res?.data) {
            dispatch(setUser({ user: res.data, token: localStorage.getItem("token") }));
          }
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Failed to update profile");
        });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card flex justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-3xl">
                  {name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-colors"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-muted-foreground text-sm">Click camera icon to change avatar</p>
          </div>

          {/* Name */}
          <div className="space-y-3">
            <label htmlFor="name" className="text-foreground text-lg font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-destructive h-12" : "h-12"}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label htmlFor="email" className="text-foreground text-lg font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? "border-destructive h-12" : "h-12"}
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label htmlFor="phone" className="text-foreground text-lg font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={errors.phone ? "border-destructive h-12" : "h-12"}
            />
            {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-base"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
