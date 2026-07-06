export function SectionHeading({
  kicker,
  title,
  intro,
  light = false,
}: {
  kicker: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="kicker">{kicker}</p>
      <h2
        className={`text-balance font-display text-4xl font-medium leading-[1.08] md:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`text-base leading-relaxed md:text-lg ${light ? "text-cream/70" : "text-ink/65"}`}>
          {intro}
        </p>
      )}
      <div className="rule-gold w-24" />
    </div>
  );
}
