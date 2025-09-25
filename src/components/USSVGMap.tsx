"use client";
import { useEffect, useRef, useState } from "react";
import { useShipping } from "@/components/ShippingContext";
import { getStateRule } from "@/data/stateRules";

// Attempts to load /us-states.svg (place your full US map SVG in /public with each state path id="CA", "NY", etc.)
// If present, makes each state clickable and highlights restricted states.
export default function USSVGMap() {
  const { state, setState } = useShipping();
  const [svg, setSvg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/us-states.svg")
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((text) => {
        if (!cancelled) setSvg(text);
      })
      .catch(() => setSvg(null));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!svg || !containerRef.current) return;
    // Attach click handlers to paths with state code IDs
    const root = containerRef.current;
    const paths = root.querySelectorAll<SVGPathElement>("svg path[id]");
    paths.forEach((p) => {
      const code = p.id.toUpperCase();
      p.style.cursor = "pointer";
      p.addEventListener("click", () => setState(code));
      // Style restricted states lightly if no fill present
      const rule = getStateRule(code);
      if (!p.getAttribute("fill")) {
        if (rule?.status === "NoShip") {
          p.setAttribute("fill", "#fecaca");
        } else if (rule?.status === "Restricted") {
          p.setAttribute("fill", "#fef3c7");
        } else {
          p.setAttribute("fill", "#ecfdf5");
        }
      }
      if (state && code === state) {
        p.setAttribute("stroke", "#111");
        p.setAttribute("stroke-width", "2");
      }
    });
    return () => {
      paths.forEach((p) => {
        // cleanup is minimal; page unmount resets DOM
        p.replaceWith(p.cloneNode(true));
      });
    };
  }, [svg, state, setState]);

  if (svg === null) {
    return (
      <div className="text-sm text-gray-600">
        Place a US states SVG at <code>/public/us-states.svg</code> with state path ids (e.g., CA, NY) to enable the
        interactive map. Falling back to the region list.
      </div>
    );
  }

  return <div ref={containerRef} className="max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />;
}

