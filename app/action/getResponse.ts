"use server";

import { getResponse } from "@/lib/GroqApiIntegration";

export const getResponseFromGroq = async (prompt: string) => {
  const result = await getResponse(prompt);
  return result;
};
