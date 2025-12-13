"use client`"
import { industries } from "@/data/industries";
import { useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = () => {

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
