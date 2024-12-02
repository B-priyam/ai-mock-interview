import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function getResponse(text: string) {
  const chatCompletion = await getGroqChatCompletion(text);
  // Print the completion returned by the LLM.
  //   console.log(chatCompletion.choices[0]?.message?.content || "");

  return chatCompletion.choices[0]?.message?.content;
}

export async function getGroqChatCompletion(text: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    model: "llama3-8b-8192",
  });
}
