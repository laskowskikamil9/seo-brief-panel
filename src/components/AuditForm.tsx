"use client";

import { useEffect, useState } from "react";
import type { AuditFormData, AuditTextResponse, TextAudit } from "@/types/audit";
import type { SeoBrief } from "@/types/brief";
import { briefToMarkdown } from "@/lib/markdown";
import { RichTextEditor } from "@/components/RichTextEditor";
import { parseBriefMarkdown } from "@/lib/parse-brief-markdown";
type AuditFormProps = {
  brief: SeoBrief | null;
  onAuditGenerated: (audit: TextAudit) => void;
};

const initialAuditData = {
  projectName: "",
  contentType: "Wpis poradnikowy",
  topic: "",
  primaryKeyword: "",
  targetAudience: "",
  contentGoal: "Odpowiedź na konkretny problem użytkownika",
  briefMarkdown: "",
};

export function AuditForm({ brief, onAuditGenerated }: AuditFormProps) {
  const [projectName, setProjectName] = useState(initialAuditData.projectName);
  const [contentType, setContentType] = useState(initialAuditData.contentType);
  const [topic, setTopic] = useState(initialAuditData.topic);
  const [primaryKeyword, setPrimaryKeyword] = useState(initialAuditData.primaryKeyword);
  const [targetAudience, setTargetAudience] = useState(initialAuditData.targetAudience);
  const [contentGoal, setContentGoal] = useState(initialAuditData.contentGoal);
  const [briefMarkdown, setBriefMarkdown] = useState(initialAuditData.briefMarkdown);
  const [copywriterText, setCopywriterText] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!brief) return;

    setProjectName(brief.meta.projectName);
    setContentType(brief.meta.contentType);
    setTopic(brief.meta.topic);
    setPrimaryKeyword(brief.meta.primaryKeyword);
    setTargetAudience(brief.meta.targetAudience);
    setContentGoal(brief.meta.contentGoal);
    setBriefMarkdown(briefToMarkdown(brief));
  }, [brief]);

  function useCurrentBrief() {
  if (!brief) {
    setError("Nie ma aktualnie wygenerowanego briefu. Wklej brief ręcznie.");
    return;
  }

  setError("");

  const markdown = briefToMarkdown(brief);

  setProjectName(brief.meta.projectName || "Bez nazwy");
  setContentType(brief.meta.contentType);
  setTopic(brief.meta.topic);
  setPrimaryKeyword(brief.meta.primaryKeyword);
  setTargetAudience(brief.meta.targetAudience);
  setContentGoal(brief.meta.contentGoal);
  setBriefMarkdown(markdown);
}
function fillFieldsFromBriefMarkdown(markdown: string) {
  const parsed = parseBriefMarkdown(markdown);

  if (parsed.projectName) setProjectName(parsed.projectName);
  if (parsed.contentType) setContentType(parsed.contentType);
  if (parsed.topic) setTopic(parsed.topic);
  if (parsed.primaryKeyword) setPrimaryKeyword(parsed.primaryKeyword);
  if (parsed.targetAudience) setTargetAudience(parsed.targetAudience);
  if (parsed.contentGoal) setContentGoal(parsed.contentGoal);
}
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData: AuditFormData = {
      projectName,
      contentType,
      topic,
      primaryKeyword,
      targetAudience,
      contentGoal,
      briefMarkdown,
      copywriterText,
      additionalNotes,
    };

    try {
      const response = await fetch("/api/audit-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as AuditTextResponse;

      if (!data.success) {
        setError(data.details ? `${data.error} Szczegóły: ${data.details}` : data.error);
        return;
      }

      onAuditGenerated(data.audit);
    } catch {
      setError("Nie udało się połączyć z API audytu. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
          Audyt tekstu
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          Sprawdź tekst względem briefu
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Możesz użyć briefu wygenerowanego przed chwilą albo wkleić brief zapisany
          wcześniej w Markdown. Dzięki temu audyt działa niezależnie od generatora.
        </p>
      </div>

      {brief ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-400">
            Dostępny aktualny brief
          </p>
          <p className="mt-2 text-sm text-white">{brief.meta.topic}</p>
          <p className="mt-1 text-xs text-zinc-400">
            {brief.meta.contentType} / {brief.meta.primaryKeyword}
          </p>

          <button
            type="button"
            onClick={useCurrentBrief}
            className="mt-4 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-lime-400 hover:text-lime-300"
          >
            Użyj tego briefu do audytu
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
          Nie musisz generować briefu od nowa. Wklej poniżej brief zapisany wcześniej jako
          Markdown.
        </div>
      )}

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="font-semibold text-white">Dane audytu</h3>

        <Field label="Nazwa projektu / klienta" required>
          <input
            className="input"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="np. Kancelaria prawna Warszawa"
          />
        </Field>

        <Field label="Typ tekstu" required>
          <select
            className="input"
            value={contentType}
            onChange={(event) => setContentType(event.target.value)}
          >
            <option>Wpis poradnikowy</option>
            <option>Opis usługi</option>
            <option>Opis kategorii e-commerce</option>
            <option>Artykuł lokalny SEO</option>
            <option>Artykuł ekspercki</option>
            <option>FAQ / baza wiedzy</option>
            <option>Landing page SEO</option>
            <option>Opis produktu</option>
            <option>Inny</option>
          </select>
        </Field>

        <Field label="Temat tekstu" required>
          <textarea
            className="input min-h-20"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="np. Dlaczego moja strona nie pojawia się w Google po wpisaniu nazwy usługi?"
          />
        </Field>

        <Field label="Fraza główna" required>
          <input
            className="input"
            value={primaryKeyword}
            onChange={(event) => setPrimaryKeyword(event.target.value)}
            placeholder="np. dlaczego strona nie pojawia się w Google"
          />
        </Field>

        <Field label="Odbiorca tekstu" required>
          <textarea
            className="input min-h-20"
            value={targetAudience}
            onChange={(event) => setTargetAudience(event.target.value)}
            placeholder="np. właściciel małej firmy, który nie zna SEO"
          />
        </Field>

        <Field label="Cel tekstu" required>
          <input
            className="input"
            value={contentGoal}
            onChange={(event) => setContentGoal(event.target.value)}
            placeholder="np. odpowiedź na konkretny problem użytkownika"
          />
        </Field>
      </section>

      <Field label="Brief SEO Markdown" required>
  <textarea
    className="input min-h-[280px]"
    value={briefMarkdown}
    onChange={(event) => {
      const value = event.target.value;
      setBriefMarkdown(value);
      fillFieldsFromBriefMarkdown(value);
    }}
    onBlur={() => fillFieldsFromBriefMarkdown(briefMarkdown)}
    placeholder="Wklej tutaj brief zapisany wcześniej jako Markdown. Pola audytu uzupełnią się automatycznie."
  />
</Field>

     <div className="grid gap-2">
  <span className="text-sm font-medium text-zinc-200">
    Tekst od copywritera <span className="text-lime-400">*</span>
  </span>

  <RichTextEditor value={copywriterText} onChange={setCopywriterText} />
  <details className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400">
  <summary className="cursor-pointer text-zinc-200">
    Pokaż HTML wysyłany do audytu
  </summary>
  <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words">
    {copywriterText}
  </pre>
</details>
</div>

      <Field label="Dodatkowe uwagi do audytu">
        <textarea
          className="input min-h-24"
          value={additionalNotes}
          onChange={(event) => setAdditionalNotes(event.target.value)}
          placeholder="Np. zwróć szczególną uwagę na sekcję o indeksacji, ton komunikacji albo CTA."
        />
      </Field>

      {error ? (
        <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-lime-400 px-5 py-4 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Audytuję tekst..." : "Audytuj tekst"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-200">
        {label} {required ? <span className="text-lime-400">*</span> : null}
      </span>
      {children}
    </label>
  );
}