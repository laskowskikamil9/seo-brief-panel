export const seoBriefSchema = {
  name: "seo_brief_response",
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["success", "brief"],
    properties: {
      success: {
        type: "boolean",
      },
      brief: {
        type: "object",
        additionalProperties: false,
        required: [
          "meta",
          "summary",
          "userIntent",
          "mainThesis",
          "topicalProfile",
          "recommendedStructure",
          "answerReadySections",
          "informationGain",
          "risksAndRestrictions",
          "seoGuidelines",
          "cta",
          "qualityChecklist",
        ],
        properties: {
          meta: {
            type: "object",
            additionalProperties: false,
            required: [
              "projectName",
              "industry",
              "siteType",
              "contentType",
              "topic",
              "primaryKeyword",
              "targetAudience",
              "contentGoal",
              "generatedAt",
            ],
            properties: {
              projectName: { type: "string" },
              industry: { type: "string" },
              siteType: { type: "string" },
              contentType: { type: "string" },
              topic: { type: "string" },
              primaryKeyword: { type: "string" },
              targetAudience: { type: "string" },
              contentGoal: { type: "string" },
              generatedAt: { type: "string" },
            },
          },
          summary: {
            type: "object",
            additionalProperties: false,
            required: ["briefOverview", "contentPurpose", "expectedOutcome"],
            properties: {
              briefOverview: { type: "string" },
              contentPurpose: { type: "string" },
              expectedOutcome: { type: "string" },
            },
          },
          userIntent: {
            type: "object",
            additionalProperties: false,
            required: [
              "primaryIntent",
              "intentType",
              "userProblems",
              "questionsToAnswer",
              "whatUserDoesNotNeed",
            ],
            properties: {
              primaryIntent: { type: "string" },
              intentType: { type: "string" },
              userProblems: {
                type: "array",
                items: { type: "string" },
              },
              questionsToAnswer: {
                type: "array",
                items: { type: "string" },
              },
              whatUserDoesNotNeed: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          mainThesis: {
            type: "object",
            additionalProperties: false,
            required: ["thesis", "supportingArguments", "angle"],
            properties: {
              thesis: { type: "string" },
              supportingArguments: {
                type: "array",
                items: { type: "string" },
              },
              angle: { type: "string" },
            },
          },
          topicalProfile: {
            type: "object",
            additionalProperties: false,
            required: [
              "coreTopics",
              "supportingTopics",
              "semanticVariants",
              "topicsToAvoidOrLimit",
            ],
            properties: {
              coreTopics: {
                type: "array",
                items: { type: "string" },
              },
              supportingTopics: {
                type: "array",
                items: { type: "string" },
              },
              semanticVariants: {
                type: "array",
                items: { type: "string" },
              },
              topicsToAvoidOrLimit: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          recommendedStructure: {
            type: "object",
            additionalProperties: false,
            required: [
              "h1",
              "introGuidelines",
              "sections",
              "conclusionGuidelines",
            ],
            properties: {
              h1: { type: "string" },
              introGuidelines: {
                type: "array",
                items: { type: "string" },
              },
              sections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: [
                    "headingLevel",
                    "heading",
                    "purpose",
                    "mustInclude",
                    "answerReadyNote",
                  ],
                  properties: {
                    headingLevel: { type: "string" },
                    heading: { type: "string" },
                    purpose: { type: "string" },
                    mustInclude: {
                      type: "array",
                      items: { type: "string" },
                    },
                    answerReadyNote: { type: "string" },
                  },
                },
              },
              conclusionGuidelines: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          answerReadySections: {
            type: "object",
            additionalProperties: false,
            required: ["requiredDirectAnswers", "formatSuggestions"],
            properties: {
              requiredDirectAnswers: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["question", "recommendedAnswer", "whereToPlace"],
                  properties: {
                    question: { type: "string" },
                    recommendedAnswer: { type: "string" },
                    whereToPlace: { type: "string" },
                  },
                },
              },
              formatSuggestions: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          informationGain: {
            type: "object",
            additionalProperties: false,
            required: [
              "uniqueAngles",
              "practicalInsights",
              "decisionSupport",
              "avoidGenericContent",
            ],
            properties: {
              uniqueAngles: {
                type: "array",
                items: { type: "string" },
              },
              practicalInsights: {
                type: "array",
                items: { type: "string" },
              },
              decisionSupport: {
                type: "array",
                items: { type: "string" },
              },
              avoidGenericContent: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          risksAndRestrictions: {
            type: "object",
            additionalProperties: false,
            required: [
              "contentRisks",
              "forbiddenSimplifications",
              "claimsThatNeedContext",
            ],
            properties: {
              contentRisks: {
                type: "array",
                items: { type: "string" },
              },
              forbiddenSimplifications: {
                type: "array",
                items: { type: "string" },
              },
              claimsThatNeedContext: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["claim", "neededContext"],
                  properties: {
                    claim: { type: "string" },
                    neededContext: { type: "string" },
                  },
                },
              },
            },
          },
          seoGuidelines: {
            type: "object",
            additionalProperties: false,
            required: [
              "primaryKeywordUsage",
              "secondaryKeywordUsage",
              "titleSuggestions",
              "metaDescriptionSuggestions",
              "faqSuggestions",
              "imageAltSuggestions",
            ],
            properties: {
              primaryKeywordUsage: { type: "string" },
              secondaryKeywordUsage: {
                type: "array",
                items: { type: "string" },
              },
              titleSuggestions: {
                type: "array",
                items: { type: "string" },
              },
              metaDescriptionSuggestions: {
                type: "array",
                items: { type: "string" },
              },
              faqSuggestions: {
                type: "array",
                items: { type: "string" },
              },
              imageAltSuggestions: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          cta: {
            type: "object",
            additionalProperties: false,
            required: [
              "ctaGoal",
              "primaryCta",
              "softCta",
              "ctaPlacement",
              "ctaWarnings",
            ],
            properties: {
              ctaGoal: { type: "string" },
              primaryCta: { type: "string" },
              softCta: { type: "string" },
              ctaPlacement: {
                type: "array",
                items: { type: "string" },
              },
              ctaWarnings: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          qualityChecklist: {
            type: "object",
            additionalProperties: false,
            required: [
              "contentQualityChecks",
              "aiVisibilityChecks",
              "seoChecks",
              "finalPassCriteria",
            ],
            properties: {
              contentQualityChecks: {
                type: "array",
                items: { type: "string" },
              },
              aiVisibilityChecks: {
                type: "array",
                items: { type: "string" },
              },
              seoChecks: {
                type: "array",
                items: { type: "string" },
              },
              finalPassCriteria: {
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