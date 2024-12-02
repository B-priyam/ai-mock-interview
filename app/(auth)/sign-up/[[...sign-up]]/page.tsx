import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-indigo-500">
      <SignUp />
    </div>
  );
};

export default page;
