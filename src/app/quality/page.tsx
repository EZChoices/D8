import fs from "node:fs";
import path from "node:path";
import ResponsiveImage from "@/components/ResponsiveImage";

function getProducts() {
  const p = path.join(process.cwd(), "content", "products.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

export default function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const products = getProducts();
  const q = (searchParams?.q || "").toLowerCase();
  const rows = q
    ? products.filter(
        (p: any) => p.title.toLowerCase().includes(q) || (p.batch_id || "").toLowerCase().includes(q)
      )
    : products.slice(0, 6);
  return (
    <section className="section">
      <h1>Quality & Lab Results</h1>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr", marginBottom: "1rem" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <ResponsiveImage
            src="https://placehold.co/1200x675?text=Lab+Testing"
            alt="Quality and lab testing banner"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
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
            {rows.map((p: any) => (
              <tr key={p.slug} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>
                  <a href={`/product/${p.slug}`}>{p.title}</a>
                </td>
                <td style={{ padding: 8 }}>{p.batch_id || "—"}</td>
                <td style={{ padding: 8 }}>{p.potency_mg || "—"}</td>
                <td style={{ padding: 8 }}>{p.tested_date || "—"}</td>
                <td style={{ padding: 8 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background:
                        (p.test_status || "PENDING") === "PASS"
                          ? "#0AAE4F"
                          : (p.test_status || "PENDING") === "ATTENTION"
                          ? "#E69E00"
                          : "#8892A2",
                      color: "#fff",
                      fontSize: 12
                    }}
                  >
                    {p.test_status || "PENDING"}
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  {p.coa_url ? (
                    <a href={p.coa_url} target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

