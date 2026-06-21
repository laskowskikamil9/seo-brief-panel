"use client";

import type { TextAudit } from "@/types/audit";

type AuditResultProps = {
  audit: TextAudit | null;
};

export function AuditResult({ audit }: AuditResultProps) {
  if (!audit) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
        <h2 className="mb-2 text-lg font-semibold text-white">Wynik audytu</h2>
        <p>
          Po wklejeniu tekstu od copywritera raport audytu pojawi się tutaj.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
          Audyt tekstu
        </p>

        <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{audit.meta.topic}</h2>
            <p className="mt-1 text-sm text-zinc-400">
              {audit.meta.contentType} / {audit.meta.primaryKeyword}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Ocena</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {audit.summary.overallScore}/100
            </p>
            <p className={`mt-1 text-sm font-semibold ${statusColor(audit.summary.status)}`}>
              {audit.summary.status}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-300">
          {audit.summary.shortVerdict}
        </p>
      </div>

      <ResultSection title="1. Podsumowanie audytu">
        <List title="Mocne strony" items={audit.summary.mainStrengths} />
        <List title="Główne problemy" items={audit.summary.mainProblems} />
        <List title="Priorytetowe poprawki" items={audit.summary.priorityFixes} />
      </ResultSection>

      <ResultSection title="2. Oceny szczegółowe">
        <div className="grid gap-3 md:grid-cols-2">
          {Object.values(audit.scores).map((score) => (
            <div
              key={score.name}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">{score.name}</h3>
                <p className="font-bold text-lime-400">
                  {score.score}/{score.maxScore}
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{score.comment}</p>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="3. Zgodność z briefem">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-300">
            <span className="font-semibold text-white">Czy tekst realizuje brief?</span>{" "}
            {audit.briefCompliance.matchesBrief ? "Tak" : "Nie w pełni"}
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            {audit.briefCompliance.comments}
          </p>
        </div>

        <List
          title="Brakujące elementy z briefu"
          items={audit.briefCompliance.missingBriefElements}
        />

        <List
          title="Elementy zbędne lub zbyt rozbudowane"
          items={audit.briefCompliance.overdevelopedOrUnnecessaryElements}
        />
      </ResultSection>

      <ResultSection title="4. Ocena Content Quality i AI Visibility">
        <div className="space-y-3">
          {Object.values(audit.contentQualityReview).map((item, index) => (
  <div
    key={`${item.sectionName}-${index}`}
    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
  >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-white">{item.sectionName}</h3>
                <span className={`text-xs font-semibold uppercase ${reviewStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-300">{item.comment}</p>

              <List title="Wymagane poprawki" items={item.requiredFixes} />
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="5. Najważniejsze problemy do poprawy">
        <div className="space-y-4">
          {audit.issues.map((issue, index) => (
            <div
              key={`${issue.area}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-white">{issue.area}</h3>
                <span className={`text-xs font-semibold uppercase ${severityColor(issue.severity)}`}>
                  {issue.severity}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div>
                  <p className="font-semibold text-zinc-100">Problem</p>
                  <p>{issue.problem}</p>
                </div>

                <div>
                  <p className="font-semibold text-zinc-100">Dlaczego to ważne</p>
                  <p>{issue.whyItMatters}</p>
                </div>

                <div>
                  <p className="font-semibold text-zinc-100">Jak poprawić</p>
                  <p>{issue.howToFix}</p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  <p className="font-semibold text-zinc-100">Przykład poprawki</p>
                  <p className="mt-1">{issue.exampleFix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="6. Sugestie przeredagowania">
        <div className="space-y-4">
          {audit.rewriteSuggestions.map((item, index) => (
            <div
              key={`${item.sectionOrFragment}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <h3 className="font-semibold text-white">{item.sectionOrFragment}</h3>

              <div className="mt-3 space-y-3 text-sm text-zinc-300">
                <div>
                  <p className="font-semibold text-zinc-100">Obecny problem</p>
                  <p>{item.currentProblem}</p>
                </div>

                <div>
                  <p className="font-semibold text-zinc-100">Kierunek poprawy</p>
                  <p>{item.suggestedDirection}</p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  <p className="font-semibold text-zinc-100">Przykładowa wersja</p>
                  <p className="mt-1">{item.exampleRewrite}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="7. SEO">
        <div className="space-y-4">
          <TextBlock title="Fraza główna" text={audit.seoReview.primaryKeywordUsage} />
          <TextBlock title="Frazy pomocnicze" text={audit.seoReview.secondaryKeywordUsage} />
          <TextBlock title="Nagłówki" text={audit.seoReview.headingsReview} />
          <List title="Sugestie meta" items={audit.seoReview.metaSuggestions} />
          <List
            title="Sugestie linkowania wewnętrznego"
            items={audit.seoReview.internalLinkingSuggestions}
          />
        </div>
      </ResultSection>

      <ResultSection title="8. Rekomendacja końcowa">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-300">
            <span className="font-semibold text-white">Czy można publikować?</span>{" "}
            {audit.finalRecommendation.canPublish ? "Tak" : "Nie, najpierw poprawić"}
          </p>
          <p className="mt-3 text-sm text-zinc-300">
            {audit.finalRecommendation.recommendation}
          </p>
        </div>

        <List
          title="Następne kroki dla copywritera"
          items={audit.finalRecommendation.nextStepsForCopywriter}
        />

        <List
          title="Następne kroki dla redaktora / SEO"
          items={audit.finalRecommendation.nextStepsForEditorOrSeoSpecialist}
        />
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

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-lime-400">{title}</p>
      <p className="mt-2 text-sm text-zinc-300">{text}</p>
    </div>
  );
}

function statusColor(status: string) {
  if (status === "PASS") return "text-lime-400";
  if (status === "WARNING") return "text-yellow-300";
  if (status === "SEVERE_FAIL") return "text-orange-300";
  return "text-red-300";
}

function severityColor(severity: string) {
  if (severity === "low") return "text-lime-400";
  if (severity === "medium") return "text-yellow-300";
  if (severity === "high") return "text-orange-300";
  return "text-red-300";
}

function reviewStatusColor(status: string) {
  if (status === "good") return "text-lime-400";
  if (status === "needs_work") return "text-yellow-300";
  return "text-red-300";
}