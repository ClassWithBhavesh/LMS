export default function StarRating({ rating }) {
  const filled = Math.round(rating || 0);
  return (
    <span>
      <span style={{ color: "#f59e0b" }}>{"★".repeat(filled)}</span>
      <span style={{ color: "#3a3a50" }}>{"★".repeat(5 - filled)}</span>
    </span>
  );
}
