export type BriefFormData = {
  projectName: string;
  industry: string;
  siteType: string;
  contentType: string;
  topic: string;
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
};

export type BriefSection = {
  headingLevel: string;
  heading: string;
  purpose: string;
  mustInclude: string[];
  answerReadyNote: string;
};

export type SeoBrief = {
  meta: {
    projectName: string;
    industry: string;
    siteType: string;
    contentType: string;
    topic: string;
    primaryKeyword: string;
    targetAudience: string;
    contentGoal: string;
    generatedAt: string;
  };
  summary: {
    briefOverview: string;
    contentPurpose: string;
    expectedOutcome: string;
  };
  userIntent: {
    primaryIntent: string;
    intentType: string;
    userProblems: string[];
    questionsToAnswer: string[];
    whatUserDoesNotNeed: string[];
  };
  mainThesis: {
    thesis: string;
    supportingArguments: string[];
    angle: string;
  };
  topicalProfile: {
    coreTopics: string[];
    supportingTopics: string[];
    semanticVariants: string[];
    topicsToAvoidOrLimit: string[];
  };
  recommendedStructure: {
    h1: string;
    introGuidelines: string[];
    sections: BriefSection[];
    conclusionGuidelines: string[];
  };
  answerReadySections: {
    requiredDirectAnswers: {
      question: string;
      recommendedAnswer: string;
      whereToPlace: string;
    }[];
    formatSuggestions: string[];
  };
  informationGain: {
    uniqueAngles: string[];
    practicalInsights: string[];
    decisionSupport: string[];
    avoidGenericContent: string[];
  };
  risksAndRestrictions: {
    contentRisks: string[];
    forbiddenSimplifications: string[];
    claimsThatNeedContext: {
      claim: string;
      neededContext: string;
    }[];
  };
  seoGuidelines: {
    primaryKeywordUsage: string;
    secondaryKeywordUsage: string[];
    titleSuggestions: string[];
    metaDescriptionSuggestions: string[];
    faqSuggestions: string[];
    imageAltSuggestions: string[];
  };
  cta: {
    ctaGoal: string;
    primaryCta: string;
    softCta: string;
    ctaPlacement: string[];
    ctaWarnings: string[];
  };
  qualityChecklist: {
    contentQualityChecks: string[];
    aiVisibilityChecks: string[];
    seoChecks: string[];
    finalPassCriteria: string[];
  };
};

export type GenerateBriefResponse =
  | {
      success: true;
      brief: SeoBrief;
    }
  | {
      success: false;
      error: string;
      missingFields?: string[];
      details?: string;
    };