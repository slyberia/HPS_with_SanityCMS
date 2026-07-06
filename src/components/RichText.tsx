import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-ink/75">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="pt-4 font-display text-3xl font-medium text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 font-display text-2xl font-medium text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-6 font-display text-xl italic text-plum">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-ink/75 marker:text-gold">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-ink/75 marker:text-gold">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-plum underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-5">
      <PortableText value={value} components={components} />
    </div>
  );
}
