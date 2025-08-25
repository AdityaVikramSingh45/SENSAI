import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_component/DashboardView";

const IndustryInsightPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  // if (isOnboarded === undefined) {
  //   redirect("/sign-in"); // or your login page
  // }
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsightPage;
