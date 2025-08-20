import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Holistic Health Webs</h1>
      <p>
        This self-assessment helps you explore six areas of holistic health:
        Physical, Cognitive, Emotional, Social, Existential, and Environmental.
      </p>
      <p>
        Answer the 60 questions to discover which areas you’re strongest in and
        which may need more attention.
      </p>
      <Link
        href="/assess"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.75rem 1.25rem",
          background: "#2563eb",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Start Assessment
      </Link>
    </main>
  );
}
