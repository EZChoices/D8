"use client";
import StateSelector from "@/components/StateSelector";
import USRegionsMap from "@/components/USRegionsMap";
import USSVGMap from "@/components/USSVGMap";
import InternationalList from "@/components/InternationalList";

export default function Page() {
  return (
    <section className="section">
      <h1>Where We Ship</h1>
      <p className="lede">Set your shipping state to check availability. We automatically hide restricted items in your cart.</p>
      <div className="mb-6">
        <h2>United States</h2>
        <p className="text-sm text-gray-700">Select your state via the map or dropdown. Restricted states appear in red.</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {/* Inline SVG map (loads /public/us-states.svg when available) */}
          <USSVGMap />
          <div>
            <StateSelector showGrid={true} />
            <div className="mt-4">
              <USRegionsMap />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2>International</h2>
        <p className="text-sm text-gray-700">We ship discreetly with customs‑friendly descriptions. Receiver assumes responsibility for complying with local laws; seized items cannot be refunded.</p>
        <div className="mt-3">
          <InternationalList />
        </div>
      </div>
    </section>
  );
}
