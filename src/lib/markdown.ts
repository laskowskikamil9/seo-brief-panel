import type { SeoBrief } from "@/types/brief";

function list(items: string[]) {
  if (!items.length) return "";
  return items.map((item) => `- ${item}`).join("\n");
}

export function briefToMarkdown(brief: SeoBrief) {
  const sections = brief.recommendedStructure.sections
    .map((section) => {
      return `### ${section.heading}

**Cel sekcji:**  
${section.purpose}

**Co musi się znaleźć:**  
${list(section.mustInclude)}

**Notatka answer-ready:**  
${section.answerReadyNote}`;
    })
    .join("\n\n");

  const answers = brief.answerReadySections.requiredDirectAnswers
    .map((answer) => {
      return `### ${answer.question}

${answer.recommendedAnswer}

**Gdzie umieścić:** ${answer.whereToPlace}`;
    })
    .join("\n\n");

  const claims = brief.risksAndRestrictions.claimsThatNeedContext
    .map((item) => {
      return `- **${item.claim}**  
  Kontekst: ${item.neededContext}`;
    })
    .join("\n");

  return `# Brief SEO: ${brief.meta.topic}

## 1. Dane tekstu

- **Projekt:** ${brief.meta.projectName}
- **Branża:** ${brief.meta.industry}
- **Typ strony:** ${brief.meta.siteType}
- **Typ tekstu:** ${brief.meta.contentType}
- **Fraza główna:** ${brief.meta.primaryKeyword}
- **Odbiorca:** ${brief.meta.targetAudience}
- **Cel tekstu:** ${brief.meta.contentGoal}

---

## 2. Zadanie dla copywritera

${brief.summary.briefOverview}

**Cel tekstu:**  
${brief.summary.contentPurpose}

**Po przeczytaniu tekstu użytkownik powinien:**  
${brief.summary.expectedOutcome}

---

## 3. Intencja użytkownika

${brief.userIntent.primaryIntent}

**Problemy użytkownika:**  
${list(brief.userIntent.userProblems)}

**Pytania, na które tekst ma odpowiedzieć:**  
${list(brief.userIntent.questionsToAnswer)}

**Czego użytkownik nie potrzebuje:**  
${list(brief.userIntent.whatUserDoesNotNeed)}

---

## 4. Główna myśl tekstu

${brief.mainThesis.thesis}

**Argumenty wspierające:**  
${list(brief.mainThesis.supportingArguments)}

**Kąt ujęcia tematu:**  
${brief.mainThesis.angle}

---

## 5. Profil tematyczny

**Tematy główne:**  
${list(brief.topicalProfile.coreTopics)}

**Tematy pomocnicze:**  
${list(brief.topicalProfile.supportingTopics)}

**Naturalne warianty językowe:**  
${list(brief.topicalProfile.semanticVariants)}

**Tematy do ograniczenia:**  
${list(brief.topicalProfile.topicsToAvoidOrLimit)}

---

## 6. Proponowany H1

# ${brief.recommendedStructure.h1}

---

## 7. Jak napisać wstęp

${list(brief.recommendedStructure.introGuidelines)}

---

## 8. Struktura tekstu

${sections}

---

## 9. Zakończenie tekstu

${list(brief.recommendedStructure.conclusionGuidelines)}

---

## 10. Fragmenty answer-ready

${answers}

**Sugerowane formaty:**  
${list(brief.answerReadySections.formatSuggestions)}

---

## 11. Information gain

Czyli co ma sprawić, że tekst nie będzie kolejnym generycznym artykułem.

**Unikalne kąty:**  
${list(brief.informationGain.uniqueAngles)}

**Praktyczne insighty:**  
${list(brief.informationGain.practicalInsights)}

**Wsparcie decyzji użytkownika:**  
${list(brief.informationGain.decisionSupport)}

**Czego unikać, żeby tekst nie był generyczny:**  
${list(brief.informationGain.avoidGenericContent)}

---

## 12. Czego nie pisać

**Ryzyka:**  
${list(brief.risksAndRestrictions.contentRisks)}

**Zakazane uproszczenia:**  
${list(brief.risksAndRestrictions.forbiddenSimplifications)}

**Twierdzenia wymagające kontekstu:**  
${claims}

---

## 13. Wytyczne SEO

**Fraza główna:**  
${brief.seoGuidelines.primaryKeywordUsage}

**Frazy pomocnicze:**  
${list(brief.seoGuidelines.secondaryKeywordUsage)}

**Propozycje title:**  
${list(brief.seoGuidelines.titleSuggestions)}

**Propozycje meta description:**  
${list(brief.seoGuidelines.metaDescriptionSuggestions)}

**FAQ:**  
${list(brief.seoGuidelines.faqSuggestions)}

**Alty grafik:**  
${list(brief.seoGuidelines.imageAltSuggestions)}

---

## 14. CTA

**Cel CTA:**  
${brief.cta.ctaGoal}

**Główne CTA:**  
${brief.cta.primaryCta}

**Miękkie CTA:**  
${brief.cta.softCta}

**Gdzie umieścić CTA:**  
${list(brief.cta.ctaPlacement)}

**Czego unikać przy CTA:**  
${list(brief.cta.ctaWarnings)}

---

## 15. Checklista przed oddaniem tekstu

**Content Quality:**  
${list(brief.qualityChecklist.contentQualityChecks)}

**AI Visibility:**  
${list(brief.qualityChecklist.aiVisibilityChecks)}

**SEO:**  
${list(brief.qualityChecklist.seoChecks)}

**Tekst można oddać, jeśli:**  
${list(brief.qualityChecklist.finalPassCriteria)}
`;
}