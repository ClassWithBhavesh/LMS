const shimmer = {
  background: "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
};

export default function SkeletonCard() {
  return (
    <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ height: 180, ...shimmer, borderRadius: 0 }} />
      <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 10, width: "40%", ...shimmer }} />
        <div style={{ height: 12, width: "90%", ...shimmer }} />
        <div style={{ height: 12, width: "75%", ...shimmer }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ height: 12, width: "35%", ...shimmer }} />
          <div style={{ height: 12, width: "20%", ...shimmer }} />
        </div>
      </div>
    </div>
  );
}
