"use client";

import { db } from "@/lib/db";
import { MockSchema } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { InterviewDataProps } from "../interview/[interviewId]/page";
import InterviewItemsCard from "./InterviewItemsCard";
import { CircleAlertIcon } from "lucide-react";

const InterViewsList = () => {
  const { user } = useUser();
  const [interViewsList, setInterViewsList] = useState<InterviewDataProps[]>();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(MockSchema)
      .where(eq(MockSchema.createdBy, user?.primaryEmailAddress?.emailAddress!))
      .orderBy(desc(MockSchema.id));
    setInterViewsList(result);
  };

  if (!interViewsList) {
    return;
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous mock interviews</h2>
      {interViewsList?.length! < 1 ? (
        <div className="text-red-500 font-bold text-2xl md:text-4xl w-full my-10 flex flex-row gap-5 items-center md:gap-10">
          <CircleAlertIcon className="size-16 md:size-24"/> No Previous Interviews found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {interViewsList?.map((item, index) => (
              <InterviewItemsCard key={index} interviewData={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InterViewsList;
