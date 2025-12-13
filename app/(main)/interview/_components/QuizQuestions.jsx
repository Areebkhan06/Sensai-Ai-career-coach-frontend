"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import QuizResult from "./QuizResult";
import { API_URL } from "@/utils/api";

const Quiz = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const [Questions, setQuestions] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answers, setanswers] = useState([]);
  const [showExplaination, setshowExplaination] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [selectedOption, setselectedOption] = useState("");
  const [nextQuestionLoading, setnextQuestionLoading] = useState(false);

  const [Quizresult, setQuizResult] = useState(null);

  const handleNext = () => {
    setnextQuestionLoading(true);
    if (!selectedOption) {
      setnextQuestionLoading(false);
      toast.error("Please Select the Option!");
      return;
    }

    let updateAnswers = [...answers];
    updateAnswers[currentQuestion] = {
      question: Questions[currentQuestion].question,
      answer: selectedOption,
      correctAnswer: Questions[currentQuestion].correctAnswer,
      isCorrect: selectedOption === Questions[currentQuestion].correctAnswer,
    };
    setanswers(updateAnswers);

    // Move to next
    if (currentQuestion < Questions.length - 1) {
      setcurrentQuestion(currentQuestion + 1);
      setshowExplaination(false);
      setselectedOption("");
    }

    setnextQuestionLoading(false);
  };

  const finishQuiz = async () => {
    if (!selectedOption) {
      toast.error("Please Select the Option!");
      return;
    }

    setnextQuestionLoading(true);

    // Copy previous answers
    let updatedAnswers = [...answers];

    // Store the current question answer as an object
    updatedAnswers[currentQuestion] = {
      question: Questions[currentQuestion].question,
      answer: selectedOption,
      correctAnswer: Questions[currentQuestion].correctAnswer,
      isCorrect: selectedOption === Questions[currentQuestion].correctAnswer,
    };

    setanswers(updatedAnswers);

    // Calculate score
    let score = updatedAnswers.filter((a) => a.isCorrect).length;

    toast.success(`Quiz Completed!`);

    try {
      const res = await fetch(`${API_URL}/api/user/save-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user.id,
          answers: updatedAnswers, // send correct objects
          score,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setQuizResult(data.result);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving quiz!");
    } finally {
      setnextQuestionLoading(false);
    }
  };

  const generateQuiz = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      setisloading(true);
      const res = await fetch(`${API_URL}/api/user/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id }),
      });

      let data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setQuestions(data.questions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  if (isloading)
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;

  if (Questions.length === 0) {
    return (
      <Card className={"mx-2"}>
        <CardHeader>
          <CardTitle>Ready to test your Knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each
            questions.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuiz} className={"w-full"}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if(Quizresult){
    return <QuizResult result={Quizresult} generateQuiz={generateQuiz}/>
  }

  // ✔️ When questions are available
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {Questions.length}
        </CardTitle>
        <CardDescription>{Questions[currentQuestion].question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={(value) => setselectedOption(value)}
        >
          {Questions[currentQuestion].options.map((opt, i) => (
            <div className="flex items-center space-x-2" key={i}>
              <RadioGroupItem value={opt} id={`option-${i}`} />
              <Label htmlFor={`option-${i}`}>{opt}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center gap-4">
          {showExplaination ? (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium">Explaination:</p>
              <p className="text-muted-foreground">
                {Questions[currentQuestion].explaination}
              </p>
            </div>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => setshowExplaination(!showExplaination)}
            >
              Show Explaination
            </Button>
          )}
          {currentQuestion < Questions.length - 1 ? (
            <Button className={""} onClick={handleNext}>
              {nextQuestionLoading ? <Loader /> : <h1>Next</h1>}
            </Button>
          ) : (
            <Button className={""} onClick={finishQuiz}>
              {nextQuestionLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" />
                  <h1>Generating Result</h1>
                </div>
              ) : (
                <h1>Finish Quiz</h1>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
// 3:20
