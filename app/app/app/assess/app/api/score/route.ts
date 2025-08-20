import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Minimal question → area map so the API knows how to score each answer.
 * Match the IDs used on your /assess page. When you add the full 60 questions,
 * extend this map with all ids → their area.
 */
const QUESTION_AREA: Record<string, "Physical" | "Cognitive" | "Emotional" | "Social" | "Existential" | "Environmental"> = {
  // sample ids from your current /assess page
  p1:   "Physical",
  c1:   "Cognitive",
  e1:   "Emotional",
  s1:   "Social",
  x1:   "Existential",
  env1: "Environmental",
  // TODO: add the rest when you paste all 60 questions
};

type Area = keyof typeof AREAS_VALUES;
const AREAS_ORDER: Area[] = ["Physical","Cognitive","Emotional","Social","Existential","Environmental"];
const AREAS_VALUES = {
  Physical: 0, Cognitive: 0, Emotional: 0,
  Social: 0, Existential: 0, Environmental: 0
} as const;

type AreaLevel = "Low" | "Medium" | "High";
function levelFor(score: number): AreaLevel {
  // thresholds assume 10 questions per area (score range 10–50).
  // With fewer questions (while you're still testing), levels are still indicative.
  if (score <= 26) return "Low";
  if (score <= 38) return "Medium";
  return "High";
}

const FEEDBACK: Record<Area, Record<AreaLevel, { summary: string; prompt: string }>> = {
  Physical: {
    High:   { summary: "You’re thriving physically. Your energy, movement, and recovery habits support your lifestyle and goals.", prompt: "What new challenge could you take on to keep your body progressing?" },
    Medium: { summary: "You’re doing well in some areas, but consistency may dip. Small adjustments could elevate performance.", prompt: "Where is one “leak” in your physical routine that you could patch this week?" },
    Low:    { summary: "Your physical base may not be fully supporting you right now.", prompt: "What is the simplest physical habit you can add today to create momentum?" }
  },
  Cognitive: {
    High:   { summary: "Your mind is sharp and adaptable. Learning and reflection build your mental resilience.", prompt: "What new skill or subject could you explore to push your thinking further?" },
    Medium: { summary: "You have moments of focus and growth, but consistency may be lacking.", prompt: "Where could you swap consumption for creation this week to sharpen your thinking?" },
    Low:    { summary: "You may be feeling mentally stagnant or distracted.", prompt: "What is one simple way you can challenge your mind each day?" }
  },
  Emotional: {
    High:   { summary: "Strong emotional awareness and resilience. You regulate and express emotions effectively.", prompt: "How could you use your emotional awareness to support others around you?" },
    Medium: { summary: "Some emotional awareness is present, but stress or expression may wobble.", prompt: "What emotion is hardest to express—and what’s one safe way to practise it?" },
    Low:    { summary: "Your emotional health may need more attention.", prompt: "What daily practice (journaling, breathing, talking) will you use to check in with yourself?" }
  },
  Social: {
    High:   { summary: "Well-connected and supported; your relationships enrich your life.", prompt: "How could you deepen one of your most meaningful relationships right now?" },
    Medium: { summary: "Some social support exists, but depth or consistency could improve.", prompt: "Who could you reach out to this week for a genuine conversation?" },
    Low:    { summary: "You may be feeling isolated or unsupported.", prompt: "What is one small step you can take to connect with others today?" }
  },
  Existential: {
    High:   { summary: "Clear values and purpose guide you. Challenges feel meaningful.", prompt: "What’s one way you can live your values more boldly this week?" },
    Medium: { summary: "Values are known but not consistently lived.", prompt: "Where are actions and values out of sync—and what one adjustment could you make?" },
    Low:    { summary: "Direction and meaning may feel unclear right now.", prompt: "What small action this week would feel truly meaningful to you?" }
  },
  Environmental: {
    High:   { summary: "Your surroundings support your goals with helpful routines and spaces.", prompt: "What subtle tweak could make your environment even more energising?" },
    Medium: { summary: "Your environment works sometimes, but friction points add stress.", prompt: "What one change in your surroundings would make the biggest daily difference?" },
    Low:    { summary: "Your environment may be holding you back.", prompt: "What is one small environmental shift you could make today to feel more supported?" }
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Expected body:
 * {
 *   answers: Record<questionId, 1|2|3|4|5>,
 *   email?: string
 * }
 */
export async function POST(req: Request) {
  const { answers, email } = await req.json() as {
    answers: Record<string, 1|2|3|4|5>,
    email?: string
  };

  // Sum scores per area
  const scores: Record<Area, number> = { ...AREAS_VALUES } as any;

  for (const [id, value] of Object.entries(answers || {})) {
    const area = QUESTION_AREA[id as keyof typeof QUESTION_AREA];
    if (!area) continue; // unknown question id
    const v = Number(value);
    if (v >= 1 && v <= 5) {
      scores[area] += v;
    }
  }

  // Build insights
  const insights = AREAS_ORDER.map(area => {
    const score = scores[area];
    const level = levelFor(score);
    return {
      area,
      score,
      level,
      feedback: FEEDBACK[area][level]
    };
  });

  // Strongest / Lowest
  const sorted = [...insights].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  // Optional email
  if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    const html = `
      <h2>Your Holistic Health Webs Results</h2>
      <p><strong>Strongest:</strong> ${strongest.area} (${strongest.score}) — ${strongest.feedback.summary}</p>
      <p><strong>Focus area:</strong> ${lowest.area} (${lowest.score}) — ${lowest.feedback.summary}</p>
      <h3>Scores</h3>
      <ul>
        ${AREAS_ORDER.map(a => `<li><strong>${a}</strong>: ${scores[a]} (${levelFor(scores[a])})</li>`).join("")}
      </ul>
      <p><strong>Coach prompts:</strong></p>
      <ul>
        ${insights.map(i => `<li><strong>${i.area}:</strong> ${i.feedback.prompt}</li>`).join("")}
      </ul>
      <p style="color:#666;font-size:12px;">You asked for this copy. We don’t store your email.</p>
    `;
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Your Holistic Health Webs Results",
        html
      });
    } catch (e) {
      console.error("Email send failed:", e);
      // We still return results even if email fails
    }
  }

  return NextResponse.json({
    scores,
    insights,
    strongest,
    lowest
  });
}
