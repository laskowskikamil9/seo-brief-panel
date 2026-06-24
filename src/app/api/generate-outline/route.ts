import { NextResponse } from "next/server";
import type { GenerateOutlineInput, GenerateOutlineResponse } from "@/types/outline";
import { openai } from "@/lib/openai";
import { OUTLINE_SYSTEM_PROMPT } from "@/lib/outline-prompt";
import { articleOutlineSchema } from "@/lib/outline-schema";

export const runtime = "nodejs";
export const maxDuration = 180;

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as GenerateOutlineInput;

    if (!data.brief) {
      return NextResponse.json<GenerateOutlineResponse>(
        {
          success: false,
          error: "Brakuje briefu SEO do wygenerowania szkieletu artykułu.",
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json<GenerateOutlineResponse>(
        {
          success: false,
          error: "Brakuje klucza OPENAI_API_KEY w zmiennych środowiskowych.",
        },
        { status: 500 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: OUTLINE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            generatedAt: new Date().toISOString(),
            brief: data.brief,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...articleOutlineSchema,
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json<GenerateOutlineResponse>(
        {
          success: false,
          error: "Model nie zwrócił szkieletu artykułu.",
        },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(outputText) as GenerateOutlineResponse;

    return NextResponse.json<GenerateOutlineResponse>(parsed);
  } catch (error) {
    console.error("Generate outline error:", error);

    return NextResponse.json<GenerateOutlineResponse>(
      {
        success: false,
        error: "Nie udało się wygenerować szkieletu artykułu. Spróbuj ponownie za chwilę.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}