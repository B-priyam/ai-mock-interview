import React from "react";
import { InterviewDataProps } from "../interview/[interviewId]/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InterviewItemsCard = ({ interviewData }: any) => {
  //   console.log(interviewData);
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interviewData.jobPosition}</h2>
      <h2 className="text-sm text-gray-700">
        {interviewData.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-500">
        createdAt : {interviewData.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Link
          href={`/dashboard/interview/${interviewData.mockId}/feedback`}
          className="w-full"
        >
          <Button className="w-full" size={"sm"} variant={"outline"}>
            Feedback
          </Button>
        </Link>
        <Link
          href={`/dashboard/interview/${interviewData.mockId}`}
          className="w-full"
        >
          <Button className="w-full" size={"sm"}>
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewItemsCard;
