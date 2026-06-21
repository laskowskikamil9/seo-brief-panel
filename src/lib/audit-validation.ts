import type { AuditFormData } from "@/types/audit";

export const requiredAuditFields: Array<keyof AuditFormData> = [
  "projectName",
  "contentType",
  "topic",
  "primaryKeyword",
  "targetAudience",
  "contentGoal",
  "briefMarkdown",
  "copywriterText",
];

export function validateAuditForm(data: AuditFormData) {
  const missingFields = requiredAuditFields.filter((field) => {
    const value = data[field];
    return !value || value.trim().length === 0;
  });

  const textTooShort =
    data.copywriterText && data.copywriterText.trim().length < 500;

  const briefTooShort =
    data.briefMarkdown && data.briefMarkdown.trim().length < 500;

  return {
    isValid: missingFields.length === 0 && !textTooShort && !briefTooShort,
    missingFields,
    textTooShort,
    briefTooShort,
  };
}