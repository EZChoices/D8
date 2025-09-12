import ResponsiveImage from "@/components/ResponsiveImage";

export default function DiscreetShipping() {
  return (
    <section className="section">
      <h1>Discreet Shipping</h1>
      <p className="lede">Plain packaging, secure seals, and privacy-focused documentation—at home and across borders.</p>
      <p>
        We prioritize privacy and product integrity from our facility to your doorstep. Packaging is plain and
        unbranded, and inner packaging is sealed and tamper-evident. We use clear, customs-friendly descriptions and a
        neutral billing descriptor.
      </p>

      <hr className="divider" />
      <h2>Packaging & Tamper-evidence</h2>
      <ul>
        <li>Plain outer mailer or box with no product names on the exterior.</li>
        <li>Interior: heat-sealed pouches and/or shrink bands with tamper-evident seals.</li>
        <li>Void-if-broken stickers on box seams for added security.</li>
        <li>Desiccants and cushioning as needed to protect contents.</li>
      </ul>

      <hr className="divider" />
      <h2>Delivery Options</h2>
      <ul>
        <li>Economy, Standard, and Priority options; tracking is emailed at dispatch.</li>
        <li>Adult signature available on request (fees may apply).</li>
        <li>Typical domestic delivery: 2–5 business days by region.</li>
      </ul>

      <hr className="divider" />
      <h2>International Shipping</h2>
      <ul>
        <li>Customs-friendly descriptions; no sensitive product names on exterior documents.</li>
        <li>Transit times vary by destination and customs processing.</li>
        <li>Customer is responsible for verifying local regulations and duties/taxes.</li>
      </ul>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {["/product-images/assets_task_01k4xcmh34e04a96fmzq5ydw8z_1757628081_img_1.webp", 
          "/product-images/assets_task_01k4xckwvxfyqskbde3sn29k3e_1757628057_img_1.webp",
          "/product-images/assets_task_01k4xd15mefzy8xyvkqp3ebcwn_1757628467_img_2.webp"].map((src) => (
          <div key={src} className="relative aspect-square w-full">
            <ResponsiveImage src={src} alt="Discreet shipping visual" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <hr className="divider" />
      <h2 className="mt-6">Safety & Handling</h2>
      <ul>
        <li>Temperature-aware packing for heat-sensitive items during warm seasons.</li>
        <li>Hazard communication and MSDS on request for wholesale partners.</li>
        <li>We reserve the right to split shipments to protect product integrity.</li>
      </ul>
    </section>
  );
}

