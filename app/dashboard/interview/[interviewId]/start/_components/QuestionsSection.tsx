"use client";

import { cn } from "@/lib/utils";
import { LightbulbIcon, Volume2 } from "lucide-react";

type QuestionsSectionProps = {
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  activeQuestionIndex: number;
};

const QuestionsSection = ({
  interviewQuestions,
  activeQuestionIndex,
}: QuestionsSectionProps) => {
  const textToSpeech = (text: any) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("sorry your browser does not support text to speech");
    }
  };
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {interviewQuestions &&
          interviewQuestions.map((a, index) => (
            <h2
              className={cn(
                "p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer",
                activeQuestionIndex === index && "bg-purple-600 text-white"
              )}
              key={index}
            >
              Question no : {index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-sm md:text-lg">
        {interviewQuestions[activeQuestionIndex].question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(interviewQuestions[activeQuestionIndex].question)
        }
      />
      <div className="border rounded-lg p-5 bg-blue-100 mt-10">
        <h2 className="flex gap-2 items-center text-purple-600">
          <LightbulbIcon />
          <strong>Note : </strong>
        </h2>
        <h2 className="text-sm text-purple-600 py-2">
          {
            "Click on record answer when you want to answer the question. At the end of the interview we will give you the feedback along with the correct answer and your answer to compare it."
          }
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;
