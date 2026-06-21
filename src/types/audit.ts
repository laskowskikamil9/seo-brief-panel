export type AuditFormData = {
  projectName: string;
  contentType: string;
  topic: string;
  primaryKeyword: string;
  targetAudience: string;
  contentGoal: string;
  briefMarkdown: string;
  copywriterText: string;
  additionalNotes: string;
};

export type AuditStatus = "PASS" | "WARNING" | "SEVERE_FAIL" | "FATAL_FAIL";

export type AuditScoreItem = {
  name: string;
  score: number;
  maxScore: number;
  comment: string;
};

export type AuditIssueSeverity = "low" | "medium" | "high" | "critical";

export type AuditIssue = {
  severity: AuditIssueSeverity;
  area: string;
  problem: string;
  whyItMatters: string;
  howToFix: string;
  exampleFix: string;
};

export type AuditSectionReview = {
  sectionName: string;
  status: "good" | "needs_work" | "missing";
  comment: string;
  requiredFixes: string[];
};

export type TextAudit = {
  meta: {
    projectName: string;
    contentType: string;
    topic: string;
    primaryKeyword: string;
    targetAudience: string;
    contentGoal: string;
    auditedAt: string;
  };
  summary: {
    overallScore: number;
    status: AuditStatus;
    shortVerdict: string;
    mainStrengths: string[];
    mainProblems: string[];
    priorityFixes: string[];
  };
  scores: {
    userIntent: AuditScoreItem;
    briefCompliance: AuditScoreItem;
    structure: AuditScoreItem;
    informationGain: AuditScoreItem;
    answerReady: AuditScoreItem;
    examplesAndExperience: AuditScoreItem;
    clarity: AuditScoreItem;
    seoNaturalness: AuditScoreItem;
    antiFluff: AuditScoreItem;
    riskControl: AuditScoreItem;
  };
  briefCompliance: {
    matchesBrief: boolean;
    missingBriefElements: string[];
    overdevelopedOrUnnecessaryElements: string[];
    comments: string;
  };
  contentQualityReview: {
    userIntent: AuditSectionReview;
    mainThesis: AuditSectionReview;
    informationGain: AuditSectionReview;
    answerReadyFragments: AuditSectionReview;
    entitiesAndConcepts: AuditSectionReview;
    factsAndClaims: AuditSectionReview;
    structureAndFlow: AuditSectionReview;
    antiFluff: AuditSectionReview;
    decisionUsefulness: AuditSectionReview;
    aiVisibility: AuditSectionReview;
  };
  issues: AuditIssue[];
  rewriteSuggestions: {
    sectionOrFragment: string;
    currentProblem: string;
    suggestedDirection: string;
    exampleRewrite: string;
  }[];
  seoReview: {
    primaryKeywordUsage: string;
    secondaryKeywordUsage: string;
    headingsReview: string;
    metaSuggestions: string[];
    internalLinkingSuggestions: string[];
  };
  finalRecommendation: {
    canPublish: boolean;
    recommendation: string;
    nextStepsForCopywriter: string[];
    nextStepsForEditorOrSeoSpecialist: string[];
  };
};

export type AuditTextResponse =
  | {
      success: true;
      audit: TextAudit;
    }
  | {
      success: false;
      error: string;
      missingFields?: string[];
      details?: string;
    };