"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Welcome Section */}
      <section className="text-center px-5 lg:px-20 mt-10">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Welcome to <span className="text-primary">
            AI Mock Interview
            </span>
        </h1>
        <p className="mt-5 text-gray-600 text-base lg:text-lg">
          Prepare for your next interview with our AI-powered platform.
          Experience realistic mock interviews, receive valuable feedback, and
          improve your performance with personalized insights.
        </p>
      </section>

      <div className="mt-10">
        <Link href={"/dashboard"}>
        <Button>
          Get Started
        </Button>
        </Link>
      </div>

      {/* Steps Section */}
      <p className="mt-10 text-xl px-5 text-center">
        Get Your your AI interview Report using 3 simple steps 
      </p>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2 px-5 lg:px-36">
        <Card className="shadow-lg p-5">
          <CardContent>
            <CardTitle className="text-xl font-semibold text-purple-700">
              Step 1: Add Details
            </CardTitle>
            <CardDescription>
              Provide some information about yourself to get started.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-5">
          <CardContent>
            <CardTitle className="text-xl font-semibold text-purple-700">
              Step 2: Answer Questions
            </CardTitle>
            <CardDescription>
              Respond to interview questions tailored to your profile.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-5">
          <CardContent>
            <CardTitle className="text-xl font-semibold text-purple-700">
              Step 3: Get Your Report
            </CardTitle>
            <CardDescription>
              Receive an AI-generated report with feedback on your performance.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Footer Section */}
      <footer className="bg-purple-700 text-white text-center py-5 mt-10 w-full">
        <p>
          &copy; {new Date().getFullYear()} AI Mock Interview. All rights
          reserved.
        </p>
      </footer>
    </main>
    </div>
  );
}
