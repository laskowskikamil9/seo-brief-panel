import type { SeoBrief } from "@/types/brief";

export type GenerateOutlineInput = {
  brief: SeoBrief;
};

export type ArticleOutlineSection = {
  headingLevel: "H2" | "H3";
  heading: string;
  sectionGoal: string;
  keyPoints: string[];
  examplesToInclude: string[];
  answerReadyFragment: string;
  suggestedFormat: string;
  avoidInThisSection: string[];
};

export type ArticleOutline = {
  meta: {
    topic: string;
    primaryKeyword: string;
    targetAudience: string;
    contentGoal: string;
    generatedAt: string;
  };
  overview: {
    articleAngle: string;
    mainPromise: string;
    readerProblem: string;
    expectedReaderOutcome: string;
  };
  structure: {
    h1: string;
    intro: {
      goal: string;
      whatToInclude: string[];
      suggestedOpening: string;
      avoid: string[];
    };
    sections: ArticleOutlineSection[];
    conclusion: {
      goal: string;
      whatToInclude: string[];
      suggestedCta: string;
    };
  };
  contentElements: {
    tables: {
      title: string;
      purpose: string;
      columns: string[];
      whereToPlace: string;
    }[];
    checklists: {
      title: string;
      items: string[];
      whereToPlace: string;
    }[];
    examples: {
      title: string;
      scenario: string;
      whereToPlace: string;
    }[];
    faq: {
      question: string;
      answerDirection: string;
    }[];
  };
  copywriterGuidelines: {
    toneOfVoice: string;
    mustInclude: string[];
    mustAvoid: string[];
    internalLinkingNotes: string[];
    seoNotes: string[];
  };
  finalQualityChecklist: string[];
};

export type GenerateOutlineResponse =
  | {
      success: true;
      outline: ArticleOutline;
    }
  | {
      success: false;
      error: string;
      details?: string;
    };