export type ParsedBriefMeta = {
  projectName: string;
  contentType: string;
  topic: string;
  primaryKeyword: string;
  targetAudience: string;
  contentGoal: string;
};

function extractLineValue(markdown: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `- \\*\\*${escapedLabel}:\\*\\*\\s*(.+)`,
    "i"
  );

  const match = markdown.match(regex);

  return match?.[1]?.trim() || "";
}

function extractTitle(markdown: string) {
  const match = markdown.match(/^# Brief SEO:\s*(.+)$/im);
  return match?.[1]?.trim() || "";
}

export function parseBriefMarkdown(markdown: string): ParsedBriefMeta {
  return {
    projectName: extractLineValue(markdown, "Projekt") || "Bez nazwy",
    contentType: extractLineValue(markdown, "Typ tekstu"),
    topic: extractTitle(markdown),
    primaryKeyword: extractLineValue(markdown, "Fraza główna"),
    targetAudience: extractLineValue(markdown, "Odbiorca"),
    contentGoal: extractLineValue(markdown, "Cel tekstu"),
  };
}