"use client";

import { useState } from "react";
import type { BriefFormData, GenerateBriefResponse, SeoBrief } from "@/types/brief";
import type { SuggestBriefFieldsResponse } from "@/types/suggest-fields";
const initialFormData: BriefFormData = {
  projectName: "Na razie bez nazwy",
  industry: "",
  siteType: "Lokalna firma usługowa",
  contentType: "Wpis poradnikowy",
  topic: "",
  topicContext: "",
  contentLength: "Średni tekst",
  primaryKeyword: "",
  secondaryKeywords: "",
  location: "",
  internalLinks: "",
  competitorLinks: "",
  seoNotes: "",
  targetAudience: "",
  audienceKnowledgeLevel: "Początkujący",
  contentGoal: "Odpowiedź na konkretny problem użytkownika",
  userStage: "Świadomy problemu",
  clientOffer: "",
  toneOfVoice: "Prosty i edukacyjny",
  restrictions: "",
  clientNotes: "",
};

type BriefFormProps = {
  onBriefGenerated: (brief: SeoBrief) => void;
};

export function BriefForm({ onBriefGenerated }: BriefFormProps) {
  const [formData, setFormData] = useState<BriefFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
const [suggestionMessage, setSuggestionMessage] = useState("");

  function updateField<K extends keyof BriefFormData>(
    field: K,
    value: BriefFormData[K]
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }
async function handleSuggestFields() {
  setError("");
  setSuggestionMessage("");

  if (!formData.industry.trim() || !formData.siteType.trim() || !formData.contentType.trim() || !formData.topic.trim()) {
    setError("Uzupełnij branżę, typ strony, typ tekstu i temat tekstu, aby automatycznie przygotować pola.");
    return;
  }

  setIsSuggesting(true);

  try {
    const response = await fetch("/api/suggest-brief-fields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        industry: formData.industry,
        siteType: formData.siteType,
        contentType: formData.contentType,
        topic: formData.topic,
      }),
    });

    const data = (await response.json()) as SuggestBriefFieldsResponse;

    if (!data.success) {
      setError(data.details ? `${data.error} Szczegóły: ${data.details}` : data.error);
      return;
    }

    setFormData((current) => ({
      ...current,
      topicContext: data.suggestions.topicContext,
      contentLength: data.suggestions.contentLength,
      primaryKeyword: data.suggestions.primaryKeyword,
      secondaryKeywords: data.suggestions.secondaryKeywords,
      location: data.suggestions.location,
      internalLinks: data.suggestions.internalLinks,
      competitorLinks: data.suggestions.competitorLinks,
      seoNotes: data.suggestions.seoNotes,
      targetAudience: data.suggestions.targetAudience,
      audienceKnowledgeLevel: data.suggestions.audienceKnowledgeLevel,
      contentGoal: data.suggestions.contentGoal,
      userStage: data.suggestions.userStage,
      clientOffer: data.suggestions.clientOffer,
      toneOfVoice: data.suggestions.toneOfVoice,
      restrictions: data.suggestions.restrictions,
      clientNotes: [
        data.suggestions.clientNotes,
        "",
        "Dlaczego panel zaproponował te dane:",
        `Intencja: ${data.suggestions.suggestionReasoning.userIntent}`,
        `Frazy: ${data.suggestions.suggestionReasoning.keywordLogic}`,
        "",
        "Content Quality:",
        ...data.suggestions.suggestionReasoning.contentQualityNotes.map((item) => `- ${item}`),
        "",
        "AI Visibility:",
        ...data.suggestions.suggestionReasoning.aiVisibilityNotes.map((item) => `- ${item}`),
      ].join("\n"),
    }));

    setSuggestionMessage("Pola zostały uzupełnione automatycznie. Sprawdź je przed wygenerowaniem briefu.");
  } catch (error) {
    setError(
      error instanceof Error
        ? `Nie udało się uzupełnić pól. Szczegóły: ${error.message}`
        : "Nie udało się uzupełnić pól automatycznie. Spróbuj ponownie."
    );
  } finally {
    setIsSuggesting(false);
  }
}
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as GenerateBriefResponse;

      if (!data.success) {
        setError(data.error);
        return;
      }

      onBriefGenerated(data.brief);
    } catch {
      setError("Nie udało się połączyć z API. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
<section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
  <div className="mb-4">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
      Start briefu
    </p>
    <h2 className="mt-1 text-lg font-semibold text-white">
      Podstawowe dane do wygenerowania briefu
    </h2>
    <p className="mt-2 text-sm text-zinc-400">
      Wpisz branżę, typ strony, typ tekstu i temat. Potem możesz kliknąć
      „Uzupełnij dane automatycznie”, a panel przygotuje resztę pól.
    </p>
  </div>

  <div className="grid gap-4">
    <Field label="Branża" required>
      <input
        className="input"
        value={formData.industry}
        onChange={(event) => updateField("industry", event.target.value)}
        placeholder="np. SEO i marketing internetowy, stomatologia, e-commerce"
      />
    </Field>

    <Field label="Typ strony" required>
      <select
        className="input"
        value={formData.siteType}
        onChange={(event) => updateField("siteType", event.target.value)}
      >
        <option>Strona usługowa</option>
        <option>Lokalna firma usługowa</option>
        <option>E-commerce</option>
        <option>B2B</option>
        <option>SaaS</option>
        <option>Portal / blog</option>
        <option>Strona ekspercka</option>
        <option>Inna</option>
      </select>
    </Field>

    <Field label="Typ tekstu" required>
      <select
        className="input"
        value={formData.contentType}
        onChange={(event) => updateField("contentType", event.target.value)}
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
      <div className="space-y-3">
        <textarea
          className="input min-h-24"
          value={formData.topic}
          onChange={(event) => updateField("topic", event.target.value)}
          placeholder="np. Dlaczego moja strona nie pojawia się w Google po wpisaniu nazwy usługi?"
        />

        <button
          type="button"
          onClick={handleSuggestFields}
          disabled={isSuggesting}
          className="rounded-lg border border-lime-500/60 px-4 py-2 text-sm font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSuggesting ? "Uzupełniam pola..." : "Uzupełnij dane automatycznie"}
        </button>

        {suggestionMessage ? (
          <p className="text-sm text-lime-300">{suggestionMessage}</p>
        ) : null}
      </div>
    </Field>

    <Field label="Kontekst tekstu">
      <textarea
        className="input min-h-24"
        value={formData.topicContext}
        onChange={(event) => updateField("topicContext", event.target.value)}
        placeholder="To pole może uzupełnić się automatycznie. Możesz je później edytować."
      />
    </Field>

    <Field label="Planowana długość tekstu">
      <select
        className="input"
        value={formData.contentLength}
        onChange={(event) => updateField("contentLength", event.target.value)}
      >
        <option>Krótki tekst</option>
        <option>Średni tekst</option>
        <option>Długi poradnik</option>
        <option>Nie wiem / dobierz do tematu</option>
      </select>
    </Field>
  </div>
</section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">SEO i wyszukiwanie</h2>

        <div className="grid gap-4">
          <Field label="Fraza główna" required>
            <input
              className="input"
              value={formData.primaryKeyword}
              onChange={(event) => updateField("primaryKeyword", event.target.value)}
              placeholder="np. dlaczego strona nie pojawia się w Google"
            />
          </Field>

          <Field label="Frazy pomocnicze">
            <textarea
              className="input min-h-24"
              value={formData.secondaryKeywords}
              onChange={(event) => updateField("secondaryKeywords", event.target.value)}
              placeholder="Wpisz każdą frazę w osobnej linii."
            />
          </Field>

          <Field label="Lokalizacja">
            <input
              className="input"
              value={formData.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="np. Warszawa, Kraków, cała Polska"
            />
          </Field>

          <Field label="Linki wewnętrzne">
            <textarea
              className="input min-h-24"
              value={formData.internalLinks}
              onChange={(event) => updateField("internalLinks", event.target.value)}
              placeholder="/kontakt/&#10;/uslugi/audyt-seo/"
            />
          </Field>

          <Field label="Uwagi SEO">
            <textarea
              className="input min-h-24"
              value={formData.seoNotes}
              onChange={(event) => updateField("seoNotes", event.target.value)}
              placeholder="np. Nie kanibalizować tekstu X. Dodać FAQ."
            />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Odbiorca i cel</h2>

        <div className="grid gap-4">
          <Field label="Odbiorca tekstu" required>
            <textarea
              className="input min-h-24"
              value={formData.targetAudience}
              onChange={(event) => updateField("targetAudience", event.target.value)}
              placeholder="np. właściciel małej firmy, który nie zna SEO"
            />
          </Field>

          <Field label="Poziom wiedzy odbiorcy">
            <select
              className="input"
              value={formData.audienceKnowledgeLevel}
              onChange={(event) =>
                updateField("audienceKnowledgeLevel", event.target.value)
              }
            >
              <option>Początkujący</option>
              <option>Średnio zaawansowany</option>
              <option>Zaawansowany</option>
              <option>Nie wiem</option>
            </select>
          </Field>

          <Field label="Cel tekstu" required>
            <select
              className="input"
              value={formData.contentGoal}
              onChange={(event) => updateField("contentGoal", event.target.value)}
            >
              <option>Pozyskanie ruchu organicznego</option>
              <option>Edukacja użytkownika</option>
              <option>Wsparcie sprzedaży</option>
              <option>Budowa topical authority</option>
              <option>Wsparcie lokalnego SEO</option>
              <option>Wsparcie kategorii / produktów</option>
              <option>Odpowiedź na konkretny problem użytkownika</option>
              <option>Inny</option>
            </select>
          </Field>

          <Field label="Etap użytkownika">
            <select
              className="input"
              value={formData.userStage}
              onChange={(event) => updateField("userStage", event.target.value)}
            >
              <option>Nieświadomy problemu</option>
              <option>Świadomy problemu</option>
              <option>Szuka rozwiązania</option>
              <option>Porównuje opcje</option>
              <option>Gotowy do kontaktu / zakupu</option>
              <option>Nie wiem</option>
            </select>
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Dodatkowe wytyczne</h2>

        <div className="grid gap-4">
          <Field label="Oferta / usługa / produkt klienta">
            <textarea
              className="input min-h-24"
              value={formData.clientOffer}
              onChange={(event) => updateField("clientOffer", event.target.value)}
              placeholder="Opisz krótko, co klient oferuje."
            />
          </Field>

          <Field label="Ton komunikacji">
            <select
              className="input"
              value={formData.toneOfVoice}
              onChange={(event) => updateField("toneOfVoice", event.target.value)}
            >
              <option>Prosty i edukacyjny</option>
              <option>Ekspercki, ale przystępny</option>
              <option>Formalny</option>
              <option>Luźny</option>
              <option>Techniczny</option>
              <option>Sprzedażowy</option>
              <option>Neutralny</option>
            </select>
          </Field>

          <Field label="Rzeczy zakazane / ograniczenia">
            <textarea
              className="input min-h-24"
              value={formData.restrictions}
              onChange={(event) => updateField("restrictions", event.target.value)}
              placeholder="np. Nie obiecywać pozycji, nie pisać o cenach."
            />
          </Field>

          <Field label="Dodatkowe informacje od klienta">
            <textarea
              className="input min-h-24"
              value={formData.clientNotes}
              onChange={(event) => updateField("clientNotes", event.target.value)}
              placeholder="Wklej dodatkowe notatki lub wymagania."
            />
          </Field>
        </div>
      </section>

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
        {isLoading ? "Generuję brief..." : "Generuj brief"}
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