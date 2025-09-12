export default function Loading() {
  return (
    <section className="section">
      <h1>Shop</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          gap: "1rem"
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "260px",
              border: "1px solid #eee",
              borderRadius: "8px",
              background: "#f7f7f7"
            }}
          />
        ))}
      </div>
    </section>
  );
}

