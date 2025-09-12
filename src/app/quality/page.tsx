import fs from "node:fs";
import path from "node:path";
import ResponsiveImage from "@/components/ResponsiveImage";

function getProducts() {
  const p = path.join(process.cwd(), "content", "products.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

export default function Page({ searchParams }: { searchParams?: { q?: string; all?: string } }) {
  const products = getProducts();
  const q = (searchParams?.q || "").toLowerCase();
  let rows = q
    ? products.filter(
        (p: any) => p.title.toLowerCase().includes(q) || (p.batch_id || "").toLowerCase().includes(q)
      )
    : products;
  const showAll = searchParams?.all === "1" || q.length > 0;
  if (!showAll) rows = rows.slice(0, 8);
  return (
    <section className="section">
      <h1>Quality & Lab Results</h1>
      <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "2fr 1fr 1fr", marginBottom: "1rem" }}>
        {(products.slice(0, 3) as any[]).map((p: any, idx: number) => (
          <div key={p.slug} style={{ position: "relative", width: "100%", aspectRatio: idx === 0 ? "16/9" : "1/1" }}>
            <ResponsiveImage src={p.images?.[0]} alt={p.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <h2>Every Batch, Verified</h2>
      <p>
        We test each batch via ISO‑accredited labs to confirm potency and screen for contaminants: pesticides,
        residual solvents, and heavy metals.
      </p>

      <h2>How to Read a COA</h2>
      <ol>
        <li>Find product and batch ID</li>
        <li>Review the potency panel</li>
        <li>Check contaminant panels</li>
        <li>Confirm test date and lab</li>
      </ol>

      <h2>Direct Supply Chain</h2>
      <p>
        We coordinate sourcing, extraction, formulation, filling, and testing to keep quality consistent. Partners
        maintain GMP‑aligned practices and standardized QC checks. Every run is traceable by batch ID.
      </p>

      <h2 id="lab-results">Find Your COA</h2>
      <form action="" method="get" style={{ marginBottom: "0.75rem" }}>
        <input
          type="search"
          name="q"
          defaultValue={searchParams?.q || ""}
          placeholder="Search by product or batch"
          style={{ border: "1px solid #ccc", padding: "8px", width: "100%", maxWidth: 360 }}
        />
      </form>
      <div style={{ overflowX: "auto" }}>
        <table role="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Product</th>
              <th style={{ textAlign: "left", padding: 8 }}>Batch ID</th>
              <th style={{ textAlign: "left", padding: 8 }}>Potency (mg)</th>
              <th style={{ textAlign: "left", padding: 8 }}>Tested</th>
              <th style={{ textAlign: "left", padding: 8 }}>Status</th>
              <th style={{ textAlign: "left", padding: 8 }}>COA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p: any) => {
              const status = p.test_status || "PASS";
              const tested = p.tested_date || "Recent";
              return (
              <tr key={p.slug} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>
                  <a href={`/product/${p.slug}`}>{p.title}</a>
                </td>
                <td style={{ padding: 8 }}>{p.batch_id || "—"}</td>
                <td style={{ padding: 8 }}>{p.potency_mg || "—"}</td>
                <td style={{ padding: 8 }}>{tested}</td>
                <td style={{ padding: 8 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background:
                        status === "PASS"
                          ? "#0AAE4F"
                          : status === "ATTENTION"
                          ? "#E69E00"
                          : "#8892A2",
                      color: "#fff",
                      fontSize: 12
                    }}
                  >
                    {status}
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  {p.coa_url ? (
                    <a href={p.coa_url} target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  ) : (
                    <a href={`/product/${p.slug}`}>Details</a>
                  )}
                </td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>
      {!showAll && (
        <p style={{ marginTop: "0.75rem" }}>
          <a href="/quality?all=1#lab-results">View all lab results</a>
        </p>
      )}
    </section>
  );
}
