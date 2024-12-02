"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { MockSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

export interface InterviewDataProps {
  id: number;
  jsonMockResponse: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
}

const Interview = ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const [interviewData, setInterviewData] = useState<InterviewDataProps>();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewId, setInterviewId] = useState("");

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
    setInterviewData(result[0]);
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);
  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl ">{"let's get started"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-2">
          <div className="flex flex-col my-5 gap-5 rounded-lg border p-5">
            <h2>
              <strong>Job Role/Job position : </strong>
              {interviewData && interviewData.jobPosition}
            </h2>
            <h2>
              <strong>Job Designation : </strong>
              {interviewData && interviewData.jobDesc}
            </h2>
            <h2>
              <strong>Years of Experience : </strong>
              {interviewData && interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-300/20">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-2 text-yellow-300">
              {
                "Enable Video Web Cam and Microphone to start your AI Generated Mock Interview. It has 5 questions which you can answer and at the end you will get the report on the basis of your answer."
              }
            </h2>
            <h2 className="mt-1 text-yellow-300">
              {
                "Note : We never record your video, you can disable Web Cam access at time you want"
              }
            </h2>
          </div>
        </div>
        <div className="w-full h-full items-center flex flex-col">
          {webCamEnabled ? (
            <Webcam
              style={{
                height: 300,
                width: 300,
              }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
            />
          ) : (
            <>
              <WebcamIcon className="h-64 w-full my-7 p-10 rounded-lg border bg-secondary" />
              <Button
                className="w-full"
                onClick={() => setWebCamEnabled(true)}
                variant={"ghost"}
              >
                Enable Webcam and microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="bg-purple-700">Start interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
