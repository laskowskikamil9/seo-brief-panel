export type SuggestBriefFieldsInput = {
  industry: string;
  siteType: string;
  contentType: string;
  topic: string;
};

export type SuggestedBriefFields = {
  topicContext: string;
  contentLength: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  location: string;
  internalLinks: string;
  competitorLinks: string;
  seoNotes: string;
  targetAudience: string;
  audienceKnowledgeLevel: string;
  contentGoal: string;
  userStage: string;
  clientOffer: string;
  toneOfVoice: string;
  restrictions: string;
  clientNotes: string;
  suggestionReasoning: {
    userIntent: string;
    keywordLogic: string;
    contentQualityNotes: string[];
    aiVisibilityNotes: string[];
  };
};

export type SuggestBriefFieldsResponse =
  | {
      success: true;
      suggestions: SuggestedBriefFields;
    }
  | {
      success: false;
      error: string;
      missingFields?: string[];
      details?: string;
    };