"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";
import { API_URL } from "@/utils/api";

const InterviewPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [Assiments, setAssiments] = useState(null);


  const getAllAssiments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/get-assisments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setAssiments(data.userAssisments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please login first");
      return;
    }

    getAllAssiments();
  }, [isLoaded, isSignedIn]);

  return (
    <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Preparation
      </h1>
      <div className="space-y-5">
        {Assiments && <StatsCards assesments={Assiments} />}
        {Assiments && <PerformanceChart assesments={Assiments} />}
        {Assiments && <QuizList assesments={Assiments} />}
      </div>
    </div>
  );
};

export default InterviewPage;
