"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/lib/db";
import { userAnswerSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  ChevronsUpDownIcon,
  CircleAlertIcon,
  CircleArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FeedbackProps {
  id: number;
  question: string;
  mockIdReference: string;
  correctAnswer: string | null;
  userAnswer: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
}

const Feedback = ({ params }: { params: Promise<{ interviewId: string }> }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState<FeedbackProps[]>();
  const getfeedback = async () => {
    const result = await db
      .select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdReference, (await params).interviewId))
      .orderBy(userAnswerSchema.id);

    console.log(result);
    setFeedbackList(result);
  };

  useEffect(() => {
    getfeedback();
  }, []);

  if (!feedbackList) {
    return;
  }

  return (
    <div className="p-10">
      {feedbackList?.length < 1 ? (
        <div>
          <h2 className="font-bold text-lg text-red-500 flex flex-row gap-5 my-5">
            <CircleAlertIcon />
            No feedbacks found for the selected interview
          </h2>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-500">
            Congratulations!!!
          </h2>
          <h2 className="font-bold text-2xl">Here is your interview results</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall rating: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview Questions with correct Answers, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-3">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7">
                  {item.question}
                  <ChevronsUpDownIcon className="h-4 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>{"Rating : "}</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer : </strong>
                      {item.userAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-800">
                      <strong>Correct Answer : </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback : </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        onClick={() => router.replace("/dashboard")}
        className="font-semibold"
      >
        Home
      </Button>
    </div>
  );
};

export default Feedback;
