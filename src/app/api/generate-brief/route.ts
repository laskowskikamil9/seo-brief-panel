import { NextResponse } from "next/server";
import type { BriefFormData, GenerateBriefResponse } from "@/types/brief";
import { openai } from "@/lib/openai";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { seoBriefSchema } from "@/lib/schema";
import { validateBriefForm } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as BriefFormData;

    const validation = validateBriefForm(formData);

    if (!validation.isValid) {
      return NextResponse.json<GenerateBriefResponse>(
        {
          success: false,
          error: "Uzupełnij wymagane pola przed wygenerowaniem briefu.",
          missingFields: validation.missingFields,
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json<GenerateBriefResponse>(
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
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            ...formData,
            generatedAt: new Date().toISOString(),
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...seoBriefSchema,
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json<GenerateBriefResponse>(
        {
          success: false,
          error: "Model nie zwrócił treści briefu.",
        },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(outputText) as GenerateBriefResponse;

    return NextResponse.json<GenerateBriefResponse>(parsed);
  } catch (error) {
    console.error("Generate brief error:", error);

    return NextResponse.json<GenerateBriefResponse>(
      {
        success: false,
        error: "Nie udało się wygenerować briefu. Spróbuj ponownie za chwilę.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}