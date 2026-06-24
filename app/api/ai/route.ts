import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/app/lib/prisma";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Prompt is required",
        },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are an expert Full Stack Software Engineer.

Generate a complete project with:

1. Project Overview
2. Features
3. Folder Structure
4. Tech Stack
5. Database Design
6. API Endpoints
7. Frontend Pages
8. Backend Architecture
9. Deployment Steps
10. Future Improvements

Respond in well-formatted Markdown.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const aiResponse = completion.choices[0].message.content || "";

    // Create a simple title from the prompt
    const title =
      prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt;

    // Save to database
    await prisma.aIProject.create({
      data: {
        title,
        prompt,
        response: aiResponse,
      },
    });

    return NextResponse.json({
      success: true,
      result: aiResponse,
    });
  } catch (error: any) {
    console.error("Groq Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "AI generation failed",
      },
      { status: 500 }
    );
  }
}