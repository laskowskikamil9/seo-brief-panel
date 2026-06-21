"use client";

import { useState } from "react";
import { BriefForm } from "@/components/BriefForm";
import { BriefResult } from "@/components/BriefResult";
import { AuditForm } from "@/components/AuditForm";
import { AuditResult } from "@/components/AuditResult";
import type { SeoBrief } from "@/types/brief";
import type { TextAudit } from "@/types/audit";
import { OutlineResult } from "@/components/OutlineResult";
import type { ArticleOutline } from "@/types/outline";

export default function Home() {
  const [brief, setBrief] = useState<SeoBrief | null>(null);
  const [audit, setAudit] = useState<TextAudit | null>(null);
  const [outline, setOutline] = useState<ArticleOutline | null>(null);

  function handleBriefGenerated(newBrief: SeoBrief) {
  setBrief(newBrief);
  setAudit(null);
  setOutline(null);
}

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-lime-400">
            SEO Brief Engine
          </p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Generator briefów i audyt tekstów SEO
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Najpierw wygeneruj brief dla copywritera. Potem wklej gotowy tekst i
            sprawdź, czy realizuje intencję, strukturę, information gain,
            answer-ready, SEO i zasady jakości treści.
          </p>
        </header>

        <section className="mb-12">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
              Krok 1
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Wygeneruj brief SEO
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-400">
              Uzupełnij dane projektu, tematu, fraz, odbiorcy i celu tekstu.
              Panel przygotuje brief gotowy do przekazania copywriterowi.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr]">
            <div>
              <BriefForm onBriefGenerated={handleBriefGenerated} />
            </div>

            <div>
              {brief ? (
  <BriefResult
    brief={brief}
    onOutlineGenerated={setOutline}
  />
) : null}
{outline ? (
  <section className="mt-8">
    <OutlineResult outline={outline} />
  </section>
) : null}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800 pt-10">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
              Krok 2
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Audytuj tekst od copywritera
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-400">
  Wklej brief zapisany wcześniej oraz tekst napisany przez copywritera.
  Panel sprawdzi zgodność z briefem, jakość treści, przykłady, SEO-piankę,
  ryzykowne uproszczenia i da konkretne poprawki.
</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr]">
            <div>
              <AuditForm brief={brief} onAuditGenerated={setAudit} />
            </div>

            <div>
              <AuditResult audit={audit} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}