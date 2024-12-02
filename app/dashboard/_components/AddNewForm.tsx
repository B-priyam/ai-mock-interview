"use client";

import { getResponseFromGroq } from "@/app/action/getResponse";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { MockSchema } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewForm = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, SetExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState<string | undefined>();
  const { user } = useUser();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job position: ${jobPosition} , Job Description: ${jobDescription}, Years of Experience : ${experience} , Depends on Job Position, Job Description & Years of Experience give us 5 Interview question along with Answer in JSON format, Give only question and answer field strictly in JSON format. provide direct array without any extra text`;

    const result = await getResponseFromGroq(InputPrompt);
    const mockJsonResponse = result?.replace("```", "").replace("**", "");
    console.log(JSON.parse(mockJsonResponse!));
    setJsonData(mockJsonResponse);

    if (mockJsonResponse) {
      const response = await db
        .insert(MockSchema)
        .values({
          mockId: uuidv4(),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: experience,
          jsonMockResponse: mockJsonResponse,
          createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown email",
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockSchema.mockId });
      if (response) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${response[0].mockId}`);
      }
      console.log("Inserted ID", response);
    }
    setLoading(false);
  };
  return (
    <div className="">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-xl text-center">+ Add New</h2>
      </div>
      <div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your interviewing
              </DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div>
                <h2>
                  Add details about your job position/role, job description and
                  experience
                </h2>
              </div>
            </DialogDescription>

            <form onSubmit={submit}>
              <div className="my-3 flex gap-1 flex-col">
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="job">Job Role/Job Position</Label>
                  <Input
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    required
                    id="job"
                    placeholder="eg: full stack developer"
                  />
                </div>
                <div className="flex flex-col gap-2 my-5">
                  <Label htmlFor="desc">Job Description/Teck Stack</Label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    id="desc"
                    placeholder="eg: React , Angular, NodeJS, MySql."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="experience">Years of experience</Label>
                  <Input
                    value={experience}
                    onChange={(e) => SetExperience(e.target.value)}
                    type="number"
                    id="experience"
                    placeholder="eg: 5"
                  />
                </div>
              </div>
              <DialogFooter className="flex gap-5 justify-end">
                <Button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  variant={"ghost"}
                >
                  close
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-purple-500 text-white"
                >
                  {loading && <LoaderCircle className="animate-spin" />}
                  {loading ? "Generating from AI" : "Start Interview"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNewForm;
