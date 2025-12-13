import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/QuizQuestions";

const MockInterviewPage = () => {
  return (
    <div>
      <div className="flex flex-col space-y-2 mx-2 mb-5">
        <Link href={"/interview"}>
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className="w-4 h-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="gradient-title text-6xl font-bold">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your Knowledge with industry-specific question
          </p>
        </div>
      </div>
      <Quiz />
    </div>
  );
};

export default MockInterviewPage;
