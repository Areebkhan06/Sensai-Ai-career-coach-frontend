import React from "react";
import { CheckCircle, CheckCircle2, Trophy, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const QuizResult = ({ result, generateQuiz }) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Result
      </h1>

      {/* Score */}
      <Card>
        <CardContent>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">{result.quizScore * 10}%</h3>
            <Progress value={result.quizScore * 10} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Improvement Tip */}
      {result.improvementTip && (
        <Card>
          <CardContent className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </CardContent>
        </Card>
      )}

      {/* Questions Review */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Questions Review</h3>
        {result.questions.map((q, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <p>
                    Q{idx + 1}: {q.question}
                  </p>
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
                </div>
              </CardTitle>
              <CardDescription>
                Your Answer: {q.answer} | Correct: {q.correctAnswer}
              </CardDescription>
            </CardHeader>
            {q.isCorrect ? null : (
              <CardContent>
                <div className="bg-muted p-3 rounded-lg">
                  <p>Explanation: {q.improvementTip}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <Button className={"w-full"} onClick={() => generateQuiz()}>
        start Quiz again
      </Button>
    </div>
  );
};

export default QuizResult;
