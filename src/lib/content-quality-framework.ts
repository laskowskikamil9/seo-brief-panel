export type ContentQualityRule = {
  id: string;
  name: string;
  goal: string;
  whyItMatters: string;
  checklist: string[];
  briefImpact: string;
  auditImpact: string;
};

export const CONTENT_QUALITY_FRAMEWORK: ContentQualityRule[] = [
  {
    id: "user_intent",
    name: "Intencja użytkownika",
    goal: "Tekst ma odpowiadać na realny problem użytkownika, a nie tylko na frazę kluczową.",
    whyItMatters:
      "Systemy wyszukiwania i systemy odpowiedzi próbują dopasować dokument do potrzeby użytkownika. Jeśli tekst odpowiada na frazę, ale nie rozwiązuje problemu, będzie słabszym źródłem informacji.",
    checklist: [
      "Czy tekst jasno rozpoznaje, czego użytkownik naprawdę szuka?",
      "Czy odpowiada na główne pytanie już na początku?",
      "Czy rozróżnia różne możliwe scenariusze intencji?",
      "Czy nie rozwija tematów pobocznych kosztem głównego problemu?",
      "Czy użytkownik po przeczytaniu wie, co zrobić dalej?"
    ],
    briefImpact:
      "Brief musi zawierać sekcję z główną intencją, problemami użytkownika, pytaniami do odpowiedzi i informacją, czego użytkownik nie potrzebuje.",
    auditImpact:
      "Audyt sprawdza, czy tekst faktycznie odpowiada na intencję z briefu, czy tylko luźno omawia temat."
  },
  {
    id: "query_match",
    name: "Dopasowanie do zapytania",
    goal: "Tekst ma być jednoznacznie dopasowany do zapytania, ale bez mechanicznego upychania fraz.",
    whyItMatters:
      "Dobre dopasowanie nie polega na powtarzaniu słów kluczowych. Chodzi o to, czy dokument odpowiada na temat, język i kontekst zapytania.",
    checklist: [
      "Czy fraza główna jest użyta naturalnie?",
      "Czy tekst odpowiada na zapytanie wprost?",
      "Czy nagłówki rozwijają realne pytania użytkownika?",
      "Czy warianty językowe są użyte naturalnie?",
      "Czy tekst nie tworzy sekcji tylko po to, żeby użyć frazy?"
    ],
    briefImpact:
      "Brief powinien traktować frazy jako kontekst tematyczny i język użytkownika, nie jako listę słów do obowiązkowego użycia.",
    auditImpact:
      "Audyt wykrywa mechaniczne użycie fraz, brak odpowiedzi na zapytanie albo zbyt szerokie odejście od tematu."
  },
  {
    id: "information_gain",
    name: "Information gain",
    goal: "Tekst ma wnosić coś ponad typowe, generyczne treści konkurencji.",
    whyItMatters:
      "Jeśli tekst powtarza te same informacje, które są już w wielu innych artykułach, nie daje użytkownikowi dużej dodatkowej wartości.",
    checklist: [
      "Czy tekst dodaje praktyczne rozróżnienie?",
      "Czy zawiera przykład z życia, audytu, klienta albo realnego scenariusza?",
      "Czy wyjaśnia, kiedy popularna rada nie działa?",
      "Czy zawiera checklistę, tabelę, model diagnostyczny albo porównanie?",
      "Czy pomaga użytkownikowi podjąć decyzję?"
    ],
    briefImpact:
      "Brief musi wskazywać, co ma wyróżnić tekst: przykład, scenariusz, checklistę, typowy błąd, porównanie albo praktyczne rozróżnienie.",
    auditImpact:
      "Audyt sprawdza, czy tekst wnosi realną wartość, czy jest tylko poprawnym, ale generycznym streszczeniem tematu."
  },
  {
    id: "answer_ready",
    name: "Answer-ready fragments",
    goal: "Tekst ma zawierać krótkie, samodzielne odpowiedzi na najważniejsze pytania użytkownika.",
    whyItMatters:
      "Fragmenty answer-ready są łatwe do zrozumienia, cytowania, streszczania i wykorzystania w systemach odpowiedzi.",
    checklist: [
      "Czy główne pytanie ma krótką odpowiedź wprost?",
      "Czy odpowiedź jest zrozumiała bez czytania całego artykułu?",
      "Czy najważniejsze sekcje zaczynają się od konkretu?",
      "Czy definicje są proste i umieszczone przy pierwszym użyciu pojęcia?",
      "Czy odpowiedzi nie są zbyt ogólne?"
    ],
    briefImpact:
      "Brief powinien zawierać konkretne pytania, gotowe odpowiedzi i miejsce, w którym copywriter ma je umieścić.",
    auditImpact:
      "Audyt sprawdza, czy tekst ma fragmenty nadające się do cytowania, czy wszystkie odpowiedzi są rozmyte."
  },
  {
    id: "entities_relations",
    name: "Encje, pojęcia i relacje",
    goal: "Tekst ma jasno pokazywać najważniejsze pojęcia, obiekty, osoby, usługi, produkty, lokalizacje i relacje między nimi.",
    whyItMatters:
      "Systemy wyszukiwania i modele językowe lepiej rozumieją tekst, gdy pojęcia i relacje są jasne, spójne i dobrze osadzone w kontekście.",
    checklist: [
      "Czy tekst wyjaśnia najważniejsze pojęcia?",
      "Czy pokazuje relacje między pojęciami?",
      "Czy nie używa zamiennie pojęć, które znaczą coś innego?",
      "Czy usługi, produkty albo lokalizacje są opisane konkretnie?",
      "Czy trudne terminy są wyjaśnione prostym językiem?"
    ],
    briefImpact:
      "Brief powinien wskazywać obowiązkowe pojęcia, konteksty i relacje, które muszą pojawić się w tekście.",
    auditImpact:
      "Audyt wykrywa niejasne pojęcia, brak definicji, mylenie terminów i słabe osadzenie tematu."
  },
  {
    id: "facts_claims_verification",
    name: "Fakty, twierdzenia i weryfikacja",
    goal: "Tekst ma odróżniać fakty, obserwacje, rekomendacje i opinie, a dane wymagające aktualności powinny być oznaczone do weryfikacji.",
    whyItMatters:
      "Niezweryfikowane twierdzenia obniżają wiarygodność tekstu. W branżach prawnych, medycznych, finansowych i technicznych mogą dodatkowo wprowadzać użytkownika w błąd.",
    checklist: [
      "Czy tekst nie wymyśla liczb, cen, terminów ani przepisów?",
      "Czy mocne twierdzenia mają kontekst?",
      "Czy rekomendacje są oznaczone jako rekomendacje, a nie fakty absolutne?",
      "Czy dane zmienne są oznaczone do sprawdzenia?",
      "Czy tekst unika obietnic bez podstaw?"
    ],
    briefImpact:
      "Brief powinien wskazywać, jakie dane trzeba zweryfikować i jakich twierdzeń nie wolno pisać bez kontekstu.",
    auditImpact:
      "Audyt wskazuje twierdzenia ryzykowne, niepotwierdzone, zbyt kategoryczne lub wymagające doprecyzowania."
  },
  {
    id: "document_structure",
    name: "Struktura dokumentu",
    goal: "Tekst ma prowadzić użytkownika logicznie od problemu do zrozumienia i decyzji.",
    whyItMatters:
      "Dobra struktura pomaga użytkownikowi, wyszukiwarce i systemom AI zrozumieć, które informacje są główne, a które pomocnicze.",
    checklist: [
      "Czy wstęp szybko nazywa problem?",
      "Czy nagłówki są konkretne i nie są pustymi etykietami?",
      "Czy kolejność sekcji jest logiczna?",
      "Czy każda sekcja ma jasną funkcję?",
      "Czy zakończenie prowadzi do sensownego następnego kroku?"
    ],
    briefImpact:
      "Brief powinien zawierać H1, wytyczne do wstępu, sekcje H2/H3 z celem i elementami obowiązkowymi oraz wytyczne do zakończenia.",
    auditImpact:
      "Audyt sprawdza, czy tekst jest logicznie ułożony, czy sekcje nie powtarzają się i czy użytkownik nie gubi głównego wątku."
  },
  {
    id: "anti_fluff",
    name: "Kontrola powtórzeń i SEO-pianki",
    goal: "Tekst ma usuwać fragmenty, które nie wnoszą informacji, nie pomagają użytkownikowi i tylko sztucznie wydłużają treść.",
    whyItMatters:
      "SEO-pianka rozmywa odpowiedź, pogarsza czytelność i sprawia, że tekst wygląda jak wygenerowany pod objętość, a nie pod rozwiązanie problemu.",
    checklist: [
      "Czy są akapity, które można usunąć bez utraty sensu?",
      "Czy tekst nie powtarza tej samej myśli w kilku miejscach?",
      "Czy nie ma ogólników typu „w dzisiejszych czasach”?",
      "Czy każdy nagłówek wnosi nowy element?",
      "Czy przykłady są konkretne, a nie dekoracyjne?"
    ],
    briefImpact:
      "Brief powinien ostrzegać przed generycznymi wstępami, powtórzeniami i pisaniem sekcji tylko dla długości tekstu.",
    auditImpact:
      "Audyt wskazuje fragmenty do skrócenia, usunięcia albo przepisania na bardziej konkretne."
  },
  {
    id: "scope_and_risk",
    name: "Zakres twierdzeń i ryzyka uproszczeń",
    goal: "Tekst ma pokazywać, kiedy dana rada działa, kiedy nie działa i czego nie można obiecać.",
    whyItMatters:
      "Użytkownik może podjąć złą decyzję, jeśli tekst przedstawia złożony temat jako prostą regułę bez wyjątków i ograniczeń.",
    checklist: [
      "Czy tekst nie używa słów „zawsze”, „nigdy”, „gwarantuje” bez podstaw?",
      "Czy popularne rady mają kontekst?",
      "Czy opisano wyjątki albo ograniczenia?",
      "Czy tekst nie upraszcza tematu do jednej przyczyny?",
      "Czy branże wrażliwe mają ostrożny język?"
    ],
    briefImpact:
      "Brief powinien zawierać sekcję zakazanych uproszczeń i twierdzeń wymagających kontekstu.",
    auditImpact:
      "Audyt oznacza ryzykowne uproszczenia, fałszywe obietnice i miejsca, gdzie copywriter powinien dopisać zastrzeżenie."
  },
  {
    id: "decision_usefulness",
    name: "Użyteczność decyzyjna",
    goal: "Tekst ma pomagać użytkownikowi zrozumieć sytuację i podjąć następny rozsądny krok.",
    whyItMatters:
      "Dobry tekst SEO nie tylko opisuje temat. Powinien pomagać użytkownikowi zdecydować, co sprawdzić, co porównać, kiedy działać samodzielnie, a kiedy skontaktować się ze specjalistą.",
    checklist: [
      "Czy tekst daje użytkownikowi kolejność działań?",
      "Czy pokazuje kryteria decyzji?",
      "Czy rozróżnia różne scenariusze?",
      "Czy CTA wynika naturalnie z problemu?",
      "Czy użytkownik wie, kiedy temat wymaga konsultacji?"
    ],
    briefImpact:
      "Brief powinien zawierać sekcje wspierające decyzję: checklistę, scenariusze, kryteria wyboru albo model diagnostyczny.",
    auditImpact:
      "Audyt sprawdza, czy tekst kończy się praktycznym następnym krokiem, czy tylko ogólnym podsumowaniem."
  },
  {
    id: "experience_examples",
    name: "Doświadczenie, przykłady i praktyka",
    goal: "Tekst ma pokazywać praktyczne doświadczenie autora lub marki przez przykłady, obserwacje, scenariusze i typowe błędy.",
    whyItMatters:
      "Teksty bez przykładów często brzmią poprawnie, ale generycznie. Praktyczne obserwacje zwiększają wiarygodność i pomagają użytkownikowi zrozumieć problem.",
    checklist: [
      "Czy tekst zawiera przykład z praktyki?",
      "Czy pokazuje typowy błąd użytkownika?",
      "Czy zawiera scenariusz lub porównanie?",
      "Czy widać doświadczenie autora bez pustego chwalenia się?",
      "Czy przykład pomaga zrozumieć decyzję albo problem?"
    ],
    briefImpact:
      "Brief powinien wskazywać miejsca, w których copywriter ma dodać przykład, obserwację z pracy, typowy błąd albo scenariusz.",
    auditImpact:
      "Audyt sprawdza, czy tekst brzmi jak realna pomoc eksperta, czy jak ogólny opis z internetu."
  },
  {
    id: "ai_visibility",
    name: "AI Visibility i cytowalność",
    goal: "Tekst ma być łatwy do streszczenia, zacytowania i wykorzystania jako źródło odpowiedzi.",
    whyItMatters:
      "Systemy generatywne preferują fragmenty, które jasno odpowiadają na pytanie, mają kontekst i nie wymagają dopowiadania brakujących informacji.",
    checklist: [
      "Czy najważniejsze odpowiedzi są samodzielnie zrozumiałe?",
      "Czy fragmenty answer-ready mają kontekst?",
      "Czy definicje są krótkie i precyzyjne?",
      "Czy tekst zawiera listy, tabele lub struktury ułatwiające ekstrakcję?",
      "Czy nagłówki są zgodne z pytaniami użytkownika?"
    ],
    briefImpact:
      "Brief powinien wskazywać konkretne fragmenty answer-ready, formaty wspierające cytowalność i sekcje FAQ.",
    auditImpact:
      "Audyt sprawdza, czy tekst może być dobrym źródłem odpowiedzi, czy wymaga zbyt wielu domysłów."
  }
];

export function getContentQualityFrameworkForPrompt() {
  return CONTENT_QUALITY_FRAMEWORK.map((rule) => {
    return [
      `Nazwa: ${rule.name}`,
      `Cel: ${rule.goal}`,
      `Dlaczego ważne: ${rule.whyItMatters}`,
      `Pytania kontrolne: ${rule.checklist.join(" | ")}`,
      `Wpływ na brief: ${rule.briefImpact}`,
      `Wpływ na audyt: ${rule.auditImpact}`
    ].join("\n");
  }).join("\n\n---\n\n");
}