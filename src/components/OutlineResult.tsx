"use client";

import type { ArticleOutline } from "@/types/outline";

type OutlineResultProps = {
  outline: ArticleOutline;
};

function List({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      {children}
    </section>
  );
}

export function OutlineResult({ outline }: OutlineResultProps) {
  function copyOutline() {
    navigator.clipboard.writeText(JSON.stringify(outline, null, 2));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-lime-500/30 bg-lime-950/10 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
              Szkielet artykułu
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {outline.structure.h1}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
              To nie jest gotowy artykuł. To plan pracy dla copywritera:
              struktura, cele sekcji, przykłady, answer-ready fragmenty i
              elementy do dodania w treści.
            </p>
          </div>

          <button
            type="button"
            onClick={copyOutline}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-lime-400 hover:text-lime-300"
          >
            Kopiuj JSON
          </button>
        </div>
      </section>

      <Card title="Kierunek artykułu">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Kąt tekstu
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              {outline.overview.articleAngle}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Obietnica dla czytelnika
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              {outline.overview.mainPromise}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Problem czytelnika
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              {outline.overview.readerProblem}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Efekt po przeczytaniu
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              {outline.overview.expectedReaderOutcome}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Wstęp">
        <p className="text-sm leading-6 text-zinc-300">
          <span className="font-semibold text-white">Cel: </span>
          {outline.structure.intro.goal}
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Co uwzględnić:</p>
          <List items={outline.structure.intro.whatToInclude} />
        </div>

        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm font-semibold text-white">
            Proponowane otwarcie:
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {outline.structure.intro.suggestedOpening}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Czego unikać:</p>
          <List items={outline.structure.intro.avoid} />
        </div>
      </Card>

      <Card title="Struktura artykułu">
        <div className="space-y-4">
          {outline.structure.sections.map((section, index) => (
            <div
              key={`${section.heading}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
                {section.headingLevel}
              </p>

              <h4 className="mt-1 text-lg font-semibold text-white">
                {section.heading}
              </h4>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                <span className="font-semibold text-white">Cel sekcji: </span>
                {section.sectionGoal}
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Co napisać:
                  </p>
                  <List items={section.keyPoints} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Przykłady do dodania:
                  </p>
                  <List items={section.examplesToInclude} />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-lime-500/20 bg-black/30 p-3">
                <p className="text-sm font-semibold text-lime-300">
                  Answer-ready fragment:
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {section.answerReadyFragment}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-white">
                  Sugerowany format:
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-300">
                  {section.suggestedFormat}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-white">
                  Czego unikać w tej sekcji:
                </p>
                <List items={section.avoidInThisSection} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Zakończenie">
        <p className="text-sm leading-6 text-zinc-300">
          <span className="font-semibold text-white">Cel: </span>
          {outline.structure.conclusion.goal}
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Co uwzględnić:</p>
          <List items={outline.structure.conclusion.whatToInclude} />
        </div>

        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm font-semibold text-white">Sugerowane CTA:</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {outline.structure.conclusion.suggestedCta}
          </p>
        </div>
      </Card>

      <Card title="Elementy dodatkowe do treści">
        <div className="grid gap-4 md:grid-cols-2">
          {outline.contentElements.tables.map((table, index) => (
            <div
              key={`${table.title}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="text-sm font-semibold text-white">
                Tabela: {table.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {table.purpose}
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Gdzie: {table.whereToPlace}
              </p>
              <List items={table.columns.map((column) => `Kolumna: ${column}`)} />
            </div>
          ))}

          {outline.contentElements.checklists.map((checklist, index) => (
            <div
              key={`${checklist.title}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="text-sm font-semibold text-white">
                Checklista: {checklist.title}
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Gdzie: {checklist.whereToPlace}
              </p>
              <List items={checklist.items} />
            </div>
          ))}

          {outline.contentElements.examples.map((example, index) => (
            <div
              key={`${example.title}-${index}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <p className="text-sm font-semibold text-white">
                Przykład: {example.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {example.scenario}
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Gdzie: {example.whereToPlace}
              </p>
            </div>
          ))}
        </div>

        {outline.contentElements.faq.length ? (
          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm font-semibold text-white">FAQ:</p>
            <div className="mt-3 space-y-3">
              {outline.contentElements.faq.map((item, index) => (
                <div key={`${item.question}-${index}`}>
                  <p className="text-sm font-semibold text-lime-300">
                    {item.question}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">
                    {item.answerDirection}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Card>

      <Card title="Wytyczne dla copywritera">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Ton komunikacji:</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {outline.copywriterGuidelines.toneOfVoice}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Co musi się pojawić:</p>
            <List items={outline.copywriterGuidelines.mustInclude} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Czego unikać:</p>
            <List items={outline.copywriterGuidelines.mustAvoid} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Linkowanie wewnętrzne:
            </p>
            <List items={outline.copywriterGuidelines.internalLinkingNotes} />
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-white">Uwagi SEO:</p>
            <List items={outline.copywriterGuidelines.seoNotes} />
          </div>
        </div>
      </Card>

      <Card title="Finalna checklista jakości">
        <List items={outline.finalQualityChecklist} />
      </Card>
    </div>
  );
}