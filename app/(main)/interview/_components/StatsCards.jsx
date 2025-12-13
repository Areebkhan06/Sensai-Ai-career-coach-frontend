import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Trophy } from "lucide-react";

const StatsCards = ({ assesments }) => {
  
  const getLatestAssisment = () => {
    if (!assesments.length) return null;
    return assesments[assesments.length-1];
  };

  const getAverageScore = () => {
    if (!assesments.length) return null;
    const total = assesments.reduce(
      (sum, assesments) => sum + assesments.quizScore,
      0
    );

    return (total / assesments.length).toFixed(1);
  };

  const getTotalNumberOfQuestions = () => {
    if (!assesments.length) return null;
    const total = assesments.reduce(
      (sum, assesments) => sum + assesments.questions.length,
      0
    );

    return total;
  };
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="border border-muted shadow-none bg-transparent">
        <CardHeader
          className={"flex flex-row items-center justify-between space-y-0"}
        >
          <CardTitle className={"font-medium text-sm"}>Average Score</CardTitle>
          <Trophy className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-xs text-muted-foreground">Across all assesments</p>
        </CardContent>
      </Card>

      <Card className="border border-muted shadow-none bg-transparent">
        <CardHeader
          className={"flex flex-row items-center justify-between space-y-0"}
        >
          <CardTitle className={"font-medium text-sm"}>
            Questions Practiced
          </CardTitle>
          <Brain className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getTotalNumberOfQuestions()}
          </div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      <Card className="border border-muted shadow-none bg-transparent">
        <CardHeader
          className={"flex flex-row items-center justify-between space-y-0"}
        >
          <CardTitle className={"font-medium text-sm"}>Latest Score</CardTitle>
          <Trophy className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssisment().quizScore} / 10
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
