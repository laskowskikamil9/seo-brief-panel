"use client";

import type { SeoBrief } from "@/types/brief";
import { briefToMarkdown } from "@/lib/markdown";
import type { ArticleOutline, GenerateOutlineResponse } from "@/types/outline";
import { useState } from "react";
type BriefResultProps = {
  brief: SeoBrief;
  onOutlineGenerated: (outline: ArticleOutline) => void;
};

export function BriefResult({ brief, onOutlineGenerated }: BriefResultProps) {
  if (!brief) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
        <h2 className="mb-2 text-lg font-semibold text-white">Brief dla copywritera</h2>
        <p>
          Wypełnij formularz i kliknij „Generuj brief”. Gotowy dokument pojawi się tutaj.
        </p>
      </div>
    );
  }

  const markdown = briefToMarkdown(brief);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
const [outlineError, setOutlineError] = useState("");

  async function copyBrief() {
    await navigator.clipboard.writeText(markdown);
    alert("Brief skopiowany do schowka.");
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const safeFileName = brief.meta.topic
      .toLowerCase()
      .replace(/[^a-z0-9ąćęłńóśźż\s-]/gi, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);

    link.href = url;
    link.download = `${safeFileName || "brief-seo"}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
async function generateOutline() {
  setOutlineError("");
  setIsGeneratingOutline(true);

  try {
    const response = await fetch("/api/generate-outline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brief,
      }),
    });

    const data = (await response.json()) as GenerateOutlineResponse;

    if (!data.success) {
      setOutlineError(
        data.details ? `${data.error} Szczegóły: ${data.details}` : data.error
      );
      return;
    }

    onOutlineGenerated(data.outline);
  } catch (error) {
    setOutlineError(
      error instanceof Error
        ? `Nie udało się wygenerować szkieletu. Szczegóły: ${error.message}`
        : "Nie udało się wygenerować szkieletu artykułu. Spróbuj ponownie."
    );
  } finally {
    setIsGeneratingOutline(false);
  }
}
  return (
    <div className="space-y-5">
      <div className="sticky top-4 z-10 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
              Brief dla copywritera
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">{brief.meta.topic}</h2>
            <p className="mt-1 text-sm text-zinc-400">
              {brief.meta.contentType} / {brief.meta.industry}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyBrief}
              className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Kopiuj brief
            </button>

            <button
              onClick={downloadMarkdown}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-lime-400 hover:text-lime-300"
            >
              Eksportuj .md
            </button>
            <button
  type="button"
  onClick={generateOutline}
  disabled={isGeneratingOutline}
  className="rounded-lg border border-lime-500/60 px-4 py-2 text-sm font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
>
  {isGeneratingOutline
    ? "Generuję szkielet..."
    : "Wygeneruj szkielet artykułu"}
</button>
<button
  type="button"
  onClick={generateOutline}
  disabled={isGeneratingOutline}
  className="rounded-lg border border-lime-500/60 px-4 py-2 text-sm font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
>
  {isGeneratingOutline
    ? "Generuję szkielet..."
    : "Wygeneruj szkielet artykułu"}
</button>
          </div>
        </div>
      </div>

      <ResultSection title="1. Zadanie dla copywritera">
        <p>{brief.summary.briefOverview}</p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">Cel tekstu</p>
          <p className="mt-2 text-white">{brief.summary.contentPurpose}</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">
            Efekt po przeczytaniu
          </p>
          <p className="mt-2 text-white">{brief.summary.expectedOutcome}</p>
        </div>
      </ResultSection>

      <ResultSection title="2. Intencja użytkownika">
        <p>{brief.userIntent.primaryIntent}</p>
        <List title="Problemy użytkownika" items={brief.userIntent.userProblems} />
        <List title="Pytania do odpowiedzi" items={brief.userIntent.questionsToAnswer} />
        <List
          title="Czego użytkownik nie potrzebuje"
          items={brief.userIntent.whatUserDoesNotNeed}
        />
      </ResultSection>

      <ResultSection title="3. Główna myśl tekstu">
        <div className="rounded-xl border border-lime-900 bg-lime-950/20 p-4">
          <p className="font-semibold text-white">{brief.mainThesis.thesis}</p>
        </div>

        <List title="Argumenty wspierające" items={brief.mainThesis.supportingArguments} />

        <div>
          <h3 className="mb-2 text-sm font-semibold text-zinc-100">Kąt ujęcia tematu</h3>
          <p>{brief.mainThesis.angle}</p>
        </div>
      </ResultSection>

      <ResultSection title="4. Proponowany H1">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xl font-bold text-white">{brief.recommendedStructure.h1}</p>
        </div>
      </ResultSection>

      <ResultSection title="5. Jak napisać wstęp">
        <List title="Wytyczne do wstępu" items={brief.recommendedStructure.introGuidelines} />
      </ResultSection>

      <ResultSection title="6. Struktura tekstu">
        <div className="space-y-4">
          {brief.recommendedStructure.sections.map((section, index) => (
            <div
              key={`${section.heading}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-lime-400">
                {section.headingLevel}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">{section.heading}</h3>
              <p className="mt-2 text-sm text-zinc-300">{section.purpose}</p>
              <List title="Co musi się znaleźć" items={section.mustInclude} />
              <p className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">
                {section.answerReadyNote}
              </p>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="7. Fragmenty answer-ready">
        <div className="space-y-4">
          {brief.answerReadySections.requiredDirectAnswers.map((item, index) => (
            <div
              key={`${item.question}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <h3 className="font-semibold text-white">{item.question}</h3>
              <p className="mt-2">{item.recommendedAnswer}</p>
              <p className="mt-2 text-sm text-zinc-400">Gdzie umieścić: {item.whereToPlace}</p>
            </div>
          ))}
        </div>

        <List title="Sugerowane formaty" items={brief.answerReadySections.formatSuggestions} />
      </ResultSection>

      <ResultSection title="8. Co ma wyróżnić tekst">
        <List title="Unikalne kąty" items={brief.informationGain.uniqueAngles} />
        <List title="Praktyczne insighty" items={brief.informationGain.practicalInsights} />
        <List title="Wsparcie decyzji użytkownika" items={brief.informationGain.decisionSupport} />
        <List
          title="Jak uniknąć generyczności"
          items={brief.informationGain.avoidGenericContent}
        />
      </ResultSection>

      <ResultSection title="9. Czego nie pisać">
        <List title="Ryzyka" items={brief.risksAndRestrictions.contentRisks} />
        <List
          title="Zakazane uproszczenia"
          items={brief.risksAndRestrictions.forbiddenSimplifications}
        />

        <div className="space-y-3">
          {brief.risksAndRestrictions.claimsThatNeedContext.map((item, index) => (
            <div
              key={`${item.claim}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="font-semibold text-white">{item.claim}</p>
              <p className="mt-2 text-sm text-zinc-300">{item.neededContext}</p>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="10. Wytyczne SEO">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">Fraza główna</p>
          <p className="mt-2 text-white">{brief.seoGuidelines.primaryKeywordUsage}</p>
        </div>

        <List title="Frazy pomocnicze" items={brief.seoGuidelines.secondaryKeywordUsage} />
        <List title="Propozycje title" items={brief.seoGuidelines.titleSuggestions} />
        <List title="Propozycje meta description" items={brief.seoGuidelines.metaDescriptionSuggestions} />
        <List title="FAQ" items={brief.seoGuidelines.faqSuggestions} />
        <List title="Alty grafik" items={brief.seoGuidelines.imageAltSuggestions} />
      </ResultSection>

      <ResultSection title="11. CTA">
        <p>{brief.cta.ctaGoal}</p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">Główne CTA</p>
          <p className="mt-2 text-white">{brief.cta.primaryCta}</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">Miękkie CTA</p>
          <p className="mt-2 text-white">{brief.cta.softCta}</p>
        </div>

        <List title="Gdzie umieścić CTA" items={brief.cta.ctaPlacement} />
        <List title="Czego unikać przy CTA" items={brief.cta.ctaWarnings} />
      </ResultSection>

      <ResultSection title="12. Checklista przed oddaniem tekstu">
        <List title="Content Quality" items={brief.qualityChecklist.contentQualityChecks} />
        <List title="AI Visibility" items={brief.qualityChecklist.aiVisibilityChecks} />
        <List title="SEO" items={brief.qualityChecklist.seoChecks} />
        <List title="Tekst można oddać, jeśli" items={brief.qualityChecklist.finalPassCriteria} />
      </ResultSection>
    </div>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-300">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-sm font-semibold text-zinc-100">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-zinc-300">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}