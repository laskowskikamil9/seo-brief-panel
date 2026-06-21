import { NextResponse } from "next/server";
import type {
  SuggestBriefFieldsInput,
  SuggestBriefFieldsResponse,
} from "@/types/suggest-fields";
import { openai } from "@/lib/openai";
import { SUGGEST_FIELDS_SYSTEM_PROMPT } from "@/lib/suggest-fields-prompt";
import { suggestBriefFieldsSchema } from "@/lib/suggest-fields-schema";
import { validateSuggestFieldsInput } from "@/lib/suggest-fields-validation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as SuggestBriefFieldsInput;

    const validation = validateSuggestFieldsInput(formData);

    if (!validation.isValid) {
      return NextResponse.json<SuggestBriefFieldsResponse>(
        {
          success: false,
          error: "Uzupełnij branżę, typ strony, typ tekstu i temat tekstu.",
          missingFields: validation.missingFields,
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json<SuggestBriefFieldsResponse>(
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
          content: SUGGEST_FIELDS_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify(formData),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...suggestBriefFieldsSchema,
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json<SuggestBriefFieldsResponse>(
        {
          success: false,
          error: "Model nie zwrócił propozycji pól.",
        },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(outputText) as SuggestBriefFieldsResponse;

    return NextResponse.json<SuggestBriefFieldsResponse>(parsed);
  } catch (error) {
    console.error("Suggest brief fields error:", error);

    return NextResponse.json<SuggestBriefFieldsResponse>(
      {
        success: false,
        error: "Nie udało się uzupełnić pól automatycznie. Spróbuj ponownie za chwilę.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}