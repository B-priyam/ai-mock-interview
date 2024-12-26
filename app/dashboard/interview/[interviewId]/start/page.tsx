"use client";

import { db } from "@/lib/db";
import { MockSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import { InterviewDataProps } from "../page";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface JsonDataProps {
  question: string;
  answer: string;
}

const StartInterview = ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const [interviewId, setInterviewId] = useState("");
  const [interviewData, setInterviewData] = useState<InterviewDataProps>();
  const [mockQuestions, setMockQuestions] = useState<JsonDataProps[]>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const getInterviewId = async () => {
      setInterviewId((await params).interviewId);
    };
    getInterviewId();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockSchema)
      .where(eq(MockSchema.mockId, (await params).interviewId));
    console.log(result);
    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
    setMockQuestions(jsonMockResponse);
    setInterviewData(result[0]);
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const prevButton = () => {
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  const nextButton = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const endInterview = () => {};

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {mockQuestions && (
          <>
            <QuestionsSection
              interviewQuestions={mockQuestions}
              activeQuestionIndex={activeQuestionIndex}
            />
            <RecordAnswerSection
              interviewQuestions={mockQuestions}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
            />
          </>
        )}
      </div>
      <div className="flex justify-center lg:justify-end">
        <div className="flex  flex-wrap gap-5 justify-center mb-5">
          <Button onClick={prevButton} disabled={activeQuestionIndex === 0}>
            <ChevronLeft />
            Previous Question
          </Button>
          <Button
            onClick={nextButton}
            disabled={activeQuestionIndex === mockQuestions?.length! - 1}
          >
            Next Question
            <ChevronRight />
          </Button>
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button
              disabled={activeQuestionIndex !== mockQuestions?.length! - 1}
              onClick={endInterview}
            >
              End Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
