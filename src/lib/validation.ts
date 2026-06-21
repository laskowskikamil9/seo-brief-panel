import type { BriefFormData } from "@/types/brief";

export const requiredFields: Array<keyof BriefFormData> = [
  "projectName",
  "industry",
  "siteType",
  "contentType",
  "topic",
  "primaryKeyword",
  "targetAudience",
  "contentGoal",
];

export function validateBriefForm(data: BriefFormData) {
  const missingFields = requiredFields.filter((field) => {
    const value = data[field];
    return !value || value.trim().length === 0;
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}