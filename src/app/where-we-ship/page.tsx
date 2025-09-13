"use client";
import StateSelector from "@/components/StateSelector";

export default function Page() {
  return (
    <section className="section">
      <h1>Where We Ship</h1>
      <p className="lede">Set your shipping state to check availability. We automatically hide restricted items in your cart.</p>
      <StateSelector showGrid={true} />
    </section>
  );
}
