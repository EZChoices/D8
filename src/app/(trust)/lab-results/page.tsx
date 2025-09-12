import fs from "node:fs";
import path from "node:path";

function getProducts() {
  const p = path.join(process.cwd(), "content", "products.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

export default function Page() {
  const products = getProducts();
  return (
    <section className="section">
      <h1>Lab Results</h1>
      <p>Search your product and batch to view its Certificate of Analysis (COA).</p>
      <div style={{ overflowX: "auto" }}>
        <table role="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Product</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Batch ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Potency (mg)</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Tested</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "8px" }}>COA</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.slug} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  <a href={`/product/${p.slug}`}>{p.title}</a>
                </td>
                <td style={{ padding: "8px" }}>{p.batch_id || "—"}</td>
                <td style={{ padding: "8px" }}>{p.potency_mg || "—"}</td>
                <td style={{ padding: "8px" }}>{p.tested_date || "—"}</td>
                <td style={{ padding: "8px" }}>
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
                <td style={{ padding: "8px" }}>
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

