"use client";

import { useState } from "react";

type Answer = 1 | 2 | 3 | 4 | 5;

interface Question {
  id: string;
  text: string;
  area: string;
  reverse?: boolean;
}

const QUESTIONS: Question[] = [
  // For simplicity, we’ll just show a few here. In reality you’d expand to 60.
  { id: "p1", text: "I engage in physical activity regularly.", area: "Physical" },
  { id: "c1", text: "I enjoy learning new skills or knowledge.", area: "Cognitive" },
  { id: "e1", text: "I can identify and manage my emotions effectively.", area: "Emotional" },
  { id: "s1", text: "I feel supported by a social network of friends or colleagues.", area: "Social" },
  { id: "x1", text: "I feel a sense of purpose in my life.", area: "Existential" },
  { id: "env1", text: "My environment supports my health and wellbeing.", area: "Environmental" },
  // 👉 You’d continue until you have ~10 per category = 60 total
];

export default function AssessPage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [wantsEmail, setWantsEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<any | null>(null);

  const allAnswered = QUESTIONS.length > 0 && QUESTIONS.every(q => answers[q.id]);

  const onSubmit = async () => {
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, email: wantsEmail ? email.trim() : "" })
    });
    const data = await res.json();
    setResults(data);
  };

  if (results) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>Your Results</h2>
        {results.insights.map((i: any) => (
          <div key={i.area} style={{ marginBottom: "1rem" }}>
            <strong>{i.area}</strong>: {i.score} ({i.level})<br />
            {i.feedback.summary}<br />
            <em>{i.feedback.prompt}</em>
          </div>
        ))}
        <p><strong>Strongest:</strong> {results.strongest.area}</p>
        <p><strong>Focus area:</strong> {results.lowest.area}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Holistic Health Assessment</h2>
      {QUESTIONS.map(q => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <p>{q.text}</p>
          {[1, 2, 3, 4, 5].map(v => (
            <label key={v} style={{ marginRight: "0.5rem" }}>
              <input
                type="radio"
                name={q.id}
                value={v}
                checked={answers[q.id] === v}
                onChange={() => setAnswers({ ...answers, [q.id]: v as Answer })}
              />
              {v}
            </label>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={wantsEmail}
            onChange={e => setWantsEmail(e.target.checked)}
          />{" "}
          Email me my results
        </label>
        {wantsEmail && (
          <div style={{ marginTop: 8 }}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: 8, width: "250px" }}
            />
          </div>
        )}
      </div>

      <button
        disabled={!allAnswered}
        onClick={onSubmit}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#2563eb",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer"
        }}
      >
        See my results
      </button>
    </div>
  );
}
