"use client";

import { useState } from "react";
import { trivia } from "@/lib/content";

/** A gentle, optional quiz. Reveals the score once every question is answered. */
export default function TriviaQuiz() {
  const questions = trivia.questions;
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [revealed, setRevealed] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>(
    (acc, a, i) => (a === questions[i].answer ? acc + 1 : acc),
    0,
  );

  function choose(qIndex: number, oIndex: number) {
    if (revealed) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = oIndex;
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-reading px-5 pb-16 md:px-8">
      <ol className="space-y-12">
        {questions.map((q, qi) => (
          <li key={q.q}>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-3xl font-normal text-accent-soft">
                {String(qi + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-2xl font-normal leading-snug text-ink md:text-3xl">
                {q.q}
              </h2>
            </div>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = q.answer === oi;
                let tone =
                  "border-hairline text-ink-soft hover:border-accent-soft";
                if (revealed) {
                  if (isCorrect)
                    tone = "border-accent bg-accent/10 text-ink";
                  else if (selected)
                    tone = "border-ink-faint bg-paper-dim text-ink-faint line-through";
                } else if (selected) {
                  tone = "border-accent bg-accent/10 text-ink";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose(qi, oi)}
                    disabled={revealed}
                    className={`border px-4 py-3 text-left font-serif text-lg transition-colors disabled:cursor-default ${tone}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 border-t border-hairline pt-8 text-center">
        {revealed ? (
          <>
            <p className="numeral select-none" aria-hidden>
              {score}/{questions.length}
            </p>
            <p className="mt-2 font-serif text-xl italic text-ink-soft">
              {score === questions.length
                ? "Flawless. You clearly pay attention."
                : score >= questions.length / 2
                  ? "Not bad at all — you know us well."
                  : "We'll fill you in at the reception."}
            </p>
            <button
              type="button"
              onClick={() => {
                setAnswers(questions.map(() => null));
                setRevealed(false);
              }}
              className="link-underline mt-6 font-sans text-eyebrow uppercase tracking-eyebrow"
            >
              Play again
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={!allAnswered}
            className="border border-ink bg-ink px-8 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {allAnswered ? "Reveal my score" : "Answer all to reveal"}
          </button>
        )}
      </div>
    </div>
  );
}
