import { NextResponse } from "next/server";
import type { AuditFormData, AuditTextResponse } from "@/types/audit";
import { openai } from "@/lib/openai";
import { AUDIT_SYSTEM_PROMPT } from "@/lib/audit-prompt";
import { textAuditSchema } from "@/lib/audit-schema";
import { validateAuditForm } from "@/lib/audit-validation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as AuditFormData;

    const validation = validateAuditForm(formData);

    if (!validation.isValid) {
      let error = "Uzupełnij wymagane pola przed audytem tekstu.";

      if (validation.textTooShort) {
        error = "Tekst copywritera jest za krótki. Wklej tekst mający minimum 500 znaków.";
      }

      if (validation.briefTooShort) {
        error = "Brief jest za krótki. Wklej pełny brief mający minimum 500 znaków.";
      }

      return NextResponse.json<AuditTextResponse>(
        {
          success: false,
          error,
          missingFields: validation.missingFields,
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json<AuditTextResponse>(
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
          content: AUDIT_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            projectName: formData.projectName,
            contentType: formData.contentType,
            topic: formData.topic,
            primaryKeyword: formData.primaryKeyword,
            targetAudience: formData.targetAudience,
            contentGoal: formData.contentGoal,
            additionalNotes: formData.additionalNotes,
            auditedAt: new Date().toISOString(),
            briefMarkdown: formData.briefMarkdown,
            copywriterText: formData.copywriterText,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...textAuditSchema,
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json<AuditTextResponse>(
        {
          success: false,
          error: "Model nie zwrócił treści audytu.",
        },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(outputText) as AuditTextResponse;

    return NextResponse.json<AuditTextResponse>(parsed);
  } catch (error) {
    console.error("Audit text error:", error);

    return NextResponse.json<AuditTextResponse>(
      {
        success: false,
        error: "Nie udało się wykonać audytu tekstu. Spróbuj ponownie za chwilę.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}