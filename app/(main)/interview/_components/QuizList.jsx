"use client";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import QuizResult from "./QuizResult";

const QuizList = ({ assesments }) => {
  const router = useRouter();
  return (
    <div>
      <Card className={"bg-transparent"}>
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <div>
            <CardTitle className={"gradient-title text-3xl md:text-4xl"}>
              Recent Quizzes
            </CardTitle>
            <CardDescription>
              Review your past quiz performances
            </CardDescription>
          </div>
          <Button onClick={() => router.push("/interview/mock")}>
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assesments.map((assesment, index) => (
              <Card key={index} className={"cursor-pointer hover:bg-muted"}>
                <CardHeader>
                  <CardTitle>Quiz {index + 1}</CardTitle>
                  <CardDescription
                    className={"flex items-center justify-between"}
                  >
                    <div>Score: {assesment.quizScore * 10}</div>
                    <div>
                      {new Date(assesment.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger>
                      <Button>Check Quiz Questions</Button>
                    </DialogTrigger>
                    <DialogContent className={"max-w-3xl overflow-y-auto max-h-[90vh]"}>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          <QuizResult result={assesment} generateQuiz={()=>router.push("/interview/mock")} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizList;
