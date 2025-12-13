"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import DashBoardView from "./_components/DashBoardView";
import { BarLoader } from "react-spinners";
import { API_URL } from "@/utils/api";

const IndustryInsightsPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const checkIndustry = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/get-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkUserId: user.id }),
        });

        const data = await res.json();

        if (!data.user.industry || !data.user.skills) {
          toast.error("Please complete your profile first.");
          router.push("/onboarding"); // redirect if industry is missing
          return;
        }

        // If industry exists, fetch insights
        const insightsRes = await fetch(
          `${API_URL}/api/user/get-industry-insights`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerkUserId: user.id }),
          }
        );

        const insightsData = await insightsRes.json();

        if (insightsData.success) {
          toast.success(insightsData.message);
          setuserInfo(insightsData.data);
        } else {
          toast.error(insightsData.message);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    checkIndustry();
  }, [user?.id, isLoaded, isSignedIn, router]);


  return (
    <div className="container mx-auto">
      {userInfo ? (
        <DashBoardView userInfo={userInfo} />
      ) : (
        <div>
          <p className="text-primary">Generating Data</p>
          <BarLoader className="mt-4" width={"100%"} color="gray" />
        </div>
      )}
    </div>
  );
};

export default IndustryInsightsPage;
