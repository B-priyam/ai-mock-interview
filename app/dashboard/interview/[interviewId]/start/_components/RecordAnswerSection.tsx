"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { toast } from "sonner";
import { getResponseFromGroq } from "@/app/action/getResponse";
import { db } from "@/lib/db";
import { userAnswerSchema } from "@/lib/schema";
import { InterviewDataProps } from "../../page";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

type UseSpeechToTextResult = {
  error: string | null;
  setResults: any;
  interimResult: string | null | undefined;
  isRecording: boolean;
  results: Array<{ transcript: string; timestamp: number }> | string[];
  startSpeechToText: () => Promise<void>;
  stopSpeechToText: () => void;
};

type UseSpeechToTextOptions = {
  continuous?: boolean;
  useLegacyResults?: boolean;
};

type RecordAnswerSectionProps = {
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  activeQuestionIndex: number;
  speechToTextOptions?: UseSpeechToTextOptions;
  interviewData?: InterviewDataProps;
};

const RecordAnswerSection: React.FC<RecordAnswerSectionProps> = ({
  interviewData,
  activeQuestionIndex,
  interviewQuestions,
  speechToTextOptions = {
    continuous: true,
    useLegacyResults: false,
  },
}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  }: UseSpeechToTextResult = useSpeechToText(speechToTextOptions);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    results.map((result) => {
      if (typeof result !== "string") {
        setUserAnswer((prevans: string) => prevans + result.transcript);
      }
    });
  }, [results]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedBackPrompt = `I will provide a question and an answer. Please evaluate the answer and respond strictly in JSON format with only two fields: rating (a number from 1 to 10, where 1 is poor and 10 is excellent) and feedback (a short string explaining the rating and suggesting improvements, if any). No other text or explanation should be included in the response. Here is the input:
      Question: ${interviewQuestions[activeQuestionIndex].question}
      Answer: ${userAnswer}`;

    console.log(userAnswer);

    const result = await getResponseFromGroq(feedBackPrompt);
    const mockJsonResponse = result?.replace("```", "").replace("**", "");
    console.log(mockJsonResponse);
    const JsonFeedbackResponse = JSON.parse(mockJsonResponse!);

    const resp = await db.insert(userAnswerSchema).values({
      question:
        interviewQuestions[activeQuestionIndex]?.question ?? "Unknown question",
      mockIdReference: interviewData?.mockId ?? "Unknown mockId",
      correctAnswer:
        interviewQuestions[activeQuestionIndex]?.answer ?? "Unknown answer",
      userAnswer: userAnswer ?? "No answer provided",
      feedback: JsonFeedbackResponse?.feedback ?? "No feedback available",
      rating: JsonFeedbackResponse?.rating ?? 0,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "Unknown email",
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("user answer recorded successfully");
      setUserAnswer("");
      setLoading(false);
      setResults([]);
    }
    setResults([]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 my-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        />
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant={"outline"}
        onClick={startStopRecording}
        className="my-10"
      >
        {isRecording ? (
          <h2 className="text-red-700 font-semibold flex flex-row items-center gap-2 animate-pulse">
            <StopCircle />
            {"stop Recording"}
          </h2>
        ) : (
          <h2 className="text-purple-900 font-semibold  flex flex-row items-center gap-2">
            <Mic className="font-semibold" size={20} />
            {"Record Answer"}
          </h2>
        )}
      </Button>
    </div>
  );
};
export default RecordAnswerSection;
