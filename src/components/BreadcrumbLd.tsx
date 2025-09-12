import JsonLd from "./JsonLd";

export default function BreadcrumbLd({
  trail
}: {
  trail: { name: string; url: string }[];
}) {
  const itemListElement = trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: t.url
  }));
  return (
    <JsonLd
      json={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement }}
    />
  );
}

