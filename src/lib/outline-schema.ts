const articleOutlineSectionSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "headingLevel",
    "heading",
    "sectionGoal",
    "keyPoints",
    "examplesToInclude",
    "answerReadyFragment",
    "suggestedFormat",
    "avoidInThisSection",
  ],
  properties: {
    headingLevel: {
      type: "string",
      enum: ["H2", "H3"],
    },
    heading: { type: "string" },
    sectionGoal: { type: "string" },
    keyPoints: {
      type: "array",
      items: { type: "string" },
    },
    examplesToInclude: {
      type: "array",
      items: { type: "string" },
    },
    answerReadyFragment: { type: "string" },
    suggestedFormat: { type: "string" },
    avoidInThisSection: {
      type: "array",
      items: { type: "string" },
    },
  },
} as const;

export const articleOutlineSchema = {
  name: "article_outline_response",
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["success", "outline"],
    properties: {
      success: {
        type: "boolean",
      },
      outline: {
        type: "object",
        additionalProperties: false,
        required: [
          "meta",
          "overview",
          "structure",
          "contentElements",
          "copywriterGuidelines",
          "finalQualityChecklist",
        ],
        properties: {
          meta: {
            type: "object",
            additionalProperties: false,
            required: [
              "topic",
              "primaryKeyword",
              "targetAudience",
              "contentGoal",
              "generatedAt",
            ],
            properties: {
              topic: { type: "string" },
              primaryKeyword: { type: "string" },
              targetAudience: { type: "string" },
              contentGoal: { type: "string" },
              generatedAt: { type: "string" },
            },
          },
          overview: {
            type: "object",
            additionalProperties: false,
            required: [
              "articleAngle",
              "mainPromise",
              "readerProblem",
              "expectedReaderOutcome",
            ],
            properties: {
              articleAngle: { type: "string" },
              mainPromise: { type: "string" },
              readerProblem: { type: "string" },
              expectedReaderOutcome: { type: "string" },
            },
          },
          structure: {
            type: "object",
            additionalProperties: false,
            required: ["h1", "intro", "sections", "conclusion"],
            properties: {
              h1: { type: "string" },
              intro: {
                type: "object",
                additionalProperties: false,
                required: ["goal", "whatToInclude", "suggestedOpening", "avoid"],
                properties: {
                  goal: { type: "string" },
                  whatToInclude: {
                    type: "array",
                    items: { type: "string" },
                  },
                  suggestedOpening: { type: "string" },
                  avoid: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
              sections: {
                type: "array",
                items: articleOutlineSectionSchema,
              },
              conclusion: {
                type: "object",
                additionalProperties: false,
                required: ["goal", "whatToInclude", "suggestedCta"],
                properties: {
                  goal: { type: "string" },
                  whatToInclude: {
                    type: "array",
                    items: { type: "string" },
                  },
                  suggestedCta: { type: "string" },
                },
              },
            },
          },
          contentElements: {
            type: "object",
            additionalProperties: false,
            required: ["tables", "checklists", "examples", "faq"],
            properties: {
              tables: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["title", "purpose", "columns", "whereToPlace"],
                  properties: {
                    title: { type: "string" },
                    purpose: { type: "string" },
                    columns: {
                      type: "array",
                      items: { type: "string" },
                    },
                    whereToPlace: { type: "string" },
                  },
                },
              },
              checklists: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["title", "items", "whereToPlace"],
                  properties: {
                    title: { type: "string" },
                    items: {
                      type: "array",
                      items: { type: "string" },
                    },
                    whereToPlace: { type: "string" },
                  },
                },
              },
              examples: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["title", "scenario", "whereToPlace"],
                  properties: {
                    title: { type: "string" },
                    scenario: { type: "string" },
                    whereToPlace: { type: "string" },
                  },
                },
              },
              faq: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["question", "answerDirection"],
                  properties: {
                    question: { type: "string" },
                    answerDirection: { type: "string" },
                  },
                },
              },
            },
          },
          copywriterGuidelines: {
            type: "object",
            additionalProperties: false,
            required: [
              "toneOfVoice",
              "mustInclude",
              "mustAvoid",
              "internalLinkingNotes",
              "seoNotes",
            ],
            properties: {
              toneOfVoice: { type: "string" },
              mustInclude: {
                type: "array",
                items: { type: "string" },
              },
              mustAvoid: {
                type: "array",
                items: { type: "string" },
              },
              internalLinkingNotes: {
                type: "array",
                items: { type: "string" },
              },
              seoNotes: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          finalQualityChecklist: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
  },
  strict: true,
} as const;