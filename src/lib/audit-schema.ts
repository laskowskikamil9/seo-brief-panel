const auditScoreItemSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "score", "maxScore", "comment"],
  properties: {
    name: {
      type: "string",
    },
    score: {
      type: "number",
    },
    maxScore: {
      type: "number",
    },
    comment: {
      type: "string",
    },
  },
} as const;

const auditSectionReviewSchema = {
  type: "object",
  additionalProperties: false,
  required: ["sectionName", "status", "comment", "requiredFixes"],
  properties: {
    sectionName: {
      type: "string",
    },
    status: {
      type: "string",
      enum: ["good", "needs_work", "missing"],
    },
    comment: {
      type: "string",
    },
    requiredFixes: {
      type: "array",
      items: { type: "string" },
    },
  },
} as const;

const auditIssueSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "severity",
    "area",
    "problem",
    "whyItMatters",
    "howToFix",
    "exampleFix",
  ],
  properties: {
    severity: {
      type: "string",
      enum: ["low", "medium", "high", "critical"],
    },
    area: {
      type: "string",
    },
    problem: {
      type: "string",
    },
    whyItMatters: {
      type: "string",
    },
    howToFix: {
      type: "string",
    },
    exampleFix: {
      type: "string",
    },
  },
} as const;

export const textAuditSchema = {
  name: "text_audit_response",
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["success", "audit"],
    properties: {
      success: {
        type: "boolean",
      },
      audit: {
        type: "object",
        additionalProperties: false,
        required: [
          "meta",
          "summary",
          "scores",
          "briefCompliance",
          "contentQualityReview",
          "issues",
          "rewriteSuggestions",
          "seoReview",
          "finalRecommendation",
        ],
        properties: {
          meta: {
            type: "object",
            additionalProperties: false,
            required: [
              "projectName",
              "contentType",
              "topic",
              "primaryKeyword",
              "targetAudience",
              "contentGoal",
              "auditedAt",
            ],
            properties: {
              projectName: { type: "string" },
              contentType: { type: "string" },
              topic: { type: "string" },
              primaryKeyword: { type: "string" },
              targetAudience: { type: "string" },
              contentGoal: { type: "string" },
              auditedAt: { type: "string" },
            },
          },
          summary: {
            type: "object",
            additionalProperties: false,
            required: [
              "overallScore",
              "status",
              "shortVerdict",
              "mainStrengths",
              "mainProblems",
              "priorityFixes",
            ],
            properties: {
              overallScore: {
                type: "number",
              },
              status: {
                type: "string",
                enum: ["PASS", "WARNING", "SEVERE_FAIL", "FATAL_FAIL"],
              },
              shortVerdict: {
                type: "string",
              },
              mainStrengths: {
                type: "array",
                items: { type: "string" },
              },
              mainProblems: {
                type: "array",
                items: { type: "string" },
              },
              priorityFixes: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          scores: {
            type: "object",
            additionalProperties: false,
            required: [
              "userIntent",
              "briefCompliance",
              "structure",
              "informationGain",
              "answerReady",
              "examplesAndExperience",
              "clarity",
              "seoNaturalness",
              "antiFluff",
              "riskControl",
            ],
            properties: {
              userIntent: auditScoreItemSchema,
              briefCompliance: auditScoreItemSchema,
              structure: auditScoreItemSchema,
              informationGain: auditScoreItemSchema,
              answerReady: auditScoreItemSchema,
              examplesAndExperience: auditScoreItemSchema,
              clarity: auditScoreItemSchema,
              seoNaturalness: auditScoreItemSchema,
              antiFluff: auditScoreItemSchema,
              riskControl: auditScoreItemSchema,
            },
          },
          briefCompliance: {
            type: "object",
            additionalProperties: false,
            required: [
              "matchesBrief",
              "missingBriefElements",
              "overdevelopedOrUnnecessaryElements",
              "comments",
            ],
            properties: {
              matchesBrief: {
                type: "boolean",
              },
              missingBriefElements: {
                type: "array",
                items: { type: "string" },
              },
              overdevelopedOrUnnecessaryElements: {
                type: "array",
                items: { type: "string" },
              },
              comments: {
                type: "string",
              },
            },
          },
          contentQualityReview: {
            type: "object",
            additionalProperties: false,
            required: [
              "userIntent",
              "mainThesis",
              "informationGain",
              "answerReadyFragments",
              "entitiesAndConcepts",
              "factsAndClaims",
              "structureAndFlow",
              "antiFluff",
              "decisionUsefulness",
              "aiVisibility",
            ],
            properties: {
              userIntent: auditSectionReviewSchema,
              mainThesis: auditSectionReviewSchema,
              informationGain: auditSectionReviewSchema,
              answerReadyFragments: auditSectionReviewSchema,
              entitiesAndConcepts: auditSectionReviewSchema,
              factsAndClaims: auditSectionReviewSchema,
              structureAndFlow: auditSectionReviewSchema,
              antiFluff: auditSectionReviewSchema,
              decisionUsefulness: auditSectionReviewSchema,
              aiVisibility: auditSectionReviewSchema,
            },
          },
          issues: {
            type: "array",
            items: auditIssueSchema,
          },
          rewriteSuggestions: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "sectionOrFragment",
                "currentProblem",
                "suggestedDirection",
                "exampleRewrite",
              ],
              properties: {
                sectionOrFragment: { type: "string" },
                currentProblem: { type: "string" },
                suggestedDirection: { type: "string" },
                exampleRewrite: { type: "string" },
              },
            },
          },
          seoReview: {
            type: "object",
            additionalProperties: false,
            required: [
              "primaryKeywordUsage",
              "secondaryKeywordUsage",
              "headingsReview",
              "metaSuggestions",
              "internalLinkingSuggestions",
            ],
            properties: {
              primaryKeywordUsage: {
                type: "string",
              },
              secondaryKeywordUsage: {
                type: "string",
              },
              headingsReview: {
                type: "string",
              },
              metaSuggestions: {
                type: "array",
                items: { type: "string" },
              },
              internalLinkingSuggestions: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          finalRecommendation: {
            type: "object",
            additionalProperties: false,
            required: [
              "canPublish",
              "recommendation",
              "nextStepsForCopywriter",
              "nextStepsForEditorOrSeoSpecialist",
            ],
            properties: {
              canPublish: {
                type: "boolean",
              },
              recommendation: {
                type: "string",
              },
              nextStepsForCopywriter: {
                type: "array",
                items: { type: "string" },
              },
              nextStepsForEditorOrSeoSpecialist: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  strict: true,
} as const;