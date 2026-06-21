import type { SuggestBriefFieldsInput } from "@/types/suggest-fields";

export const requiredSuggestFields: Array<keyof SuggestBriefFieldsInput> = [
  "industry",
  "siteType",
  "contentType",
  "topic",
];

export function validateSuggestFieldsInput(data: SuggestBriefFieldsInput) {
  const missingFields = requiredSuggestFields.filter((field) => {
    const value = data[field];
    return !value || value.trim().length === 0;
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}