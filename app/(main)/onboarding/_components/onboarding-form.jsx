"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

const OnboardingForm = ({ industries }) => {
  const [formData, setFormData] = useState({
    industry: "",
    subIndustry: "",
    experience: "",
    skills: [],
    bio: "",
  });

  const router = useRouter();

  const { user, isSignedIn } = useUser();

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [errors, seterrors] = useState({});
  const [isloading, setisloading] = useState(false);

  const validates = () => {
    let newErrors = {};

    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.subIndustry)
      newErrors.subIndustry = "Sub-industry is required";

    if (!formData.experience) newErrors.experience = "Experience is required";
    else if (formData.experience < 0) newErrors.experience = "Invalid number";

    if (!formData.skills) newErrors.skills = "Skills are required";

    if (!formData.bio) newErrors.bio = "Bio is required";
    else if (formData.bio.length < 10)
      newErrors.bio = "Bio must be at least 10 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    setisloading(true);
    e.preventDefault();

    const validationErrors = validates();

    if (Object.keys(validationErrors).length > 0) {
      seterrors(validationErrors);
      setisloading(false);
      return;
    }

    seterrors({});
    if (isSignedIn) {
      try {
        const res = await fetch(`${API_URL}/api/user/save-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, clerkUserId: user.id }),
        });

        const data = await res.json();

        if (data.success) {
          setisloading(false);
          toast.success(data.message);
          setFormData({
            industry: "",
            subIndustry: "",
            experience: "",
            skills: [],
            bio: "",
          });
          router.push("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      router.push("/")
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full mt-10 max-w-lg mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Industry */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="industry">Industry</Label>

              <Select
                onValueChange={(value) => {
                  const selected = industries.find((ind) => ind.id === value);
                  setSelectedIndustry(selected);

                  setFormData({
                    ...formData,
                    industry: value,
                    subIndustry: "", // reset sub industry
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>

                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.industry && (
                <p className="text-red-500 text-xs">{errors.industry}</p>
              )}
            </div>

            {/* Sub Industry */}
            {formData.industry && (
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="subIndustry">Specialization</Label>

                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, subIndustry: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sub-industry" />
                  </SelectTrigger>

                  <SelectContent>
                    {selectedIndustry?.subIndustries?.map((sub, index) => (
                      <SelectItem key={index} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-red-500 text-xs">{errors.subIndustry}</p>
                )}
              </div>
            )}

            {/* Experience */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="experience">Experience</Label>

              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">{errors.experience}</p>
              )}
            </div>

            {/* Skills */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="skills">Skills</Label>

              <Input
                id="skills"
                placeholder="e.g., Python, Java, Project Management"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
              />

              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-red-500 text-xs">{errors.skills}</p>
              )}
            </div>

            {/* Bio */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="bio">Professional Bio</Label>

              <Textarea
                id="bio"
                className="h-32"
                placeholder="Tell us about your professional background..."
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              {errors.bio && (
                <p className="text-red-500 text-xs">{errors.bio}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              {isloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
