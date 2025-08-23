import { getAssessments } from "@/actions/interview";
import React from "react";
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";

const InterviewPage =async() => {
  const assessments = await getAssessments();
  return (
    <div>

      <h1 className="text-6xl font-bold bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 tracking-tighter text-transparent bg-clip-text pb-2 pr-2">
        Interview Preparation
      </h1>

      <div className="space-y-8">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>

    </div>
  );
};

export default InterviewPage;
