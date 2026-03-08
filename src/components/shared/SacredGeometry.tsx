export default function SacredGeometry() {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", opacity: 0.25 }}
    >
      <defs>
        <style>{`
          .geo-slow { animation: geo-spin-slow 80s linear infinite; transform-origin: 200px 200px; }
          .geo-rev  { animation: geo-spin-rev  60s linear infinite; transform-origin: 200px 200px; }
          .geo-fast { animation: geo-spin-slow 40s linear infinite; transform-origin: 200px 200px; }
          @media (prefers-reduced-motion: reduce) {
            .geo-slow, .geo-rev, .geo-fast { animation: none; }
          }
        `}</style>
      </defs>
      {/* Outer circle */}
      <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(230,168,23,0.6)" strokeWidth="1" />

      {/* Outer triangle + slow rotation */}
      <g className="geo-slow">
        <polygon points="200,30 356,265 44,265" fill="none" stroke="rgba(230,168,23,0.5)" strokeWidth="1.5" />
        <polygon points="200,370 44,135 356,135" fill="none" stroke="rgba(230,81,0,0.4)" strokeWidth="1.5" />
      </g>

      {/* Inner hexagram */}
      <g className="geo-rev">
        <polygon points="200,80 310,215 90,215" fill="none" stroke="rgba(230,168,23,0.4)" strokeWidth="1" />
        <polygon points="200,320 90,185 310,185" fill="none" stroke="rgba(230,81,0,0.3)" strokeWidth="1" />
      </g>

      {/* Petals (lotus) */}
      <g className="geo-fast">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * 360;
          return (
            <ellipse
              key={i}
              cx="200" cy="130"
              rx="18" ry="50"
              fill="none"
              stroke="rgba(230,168,23,0.3)"
              strokeWidth="0.8"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
      </g>

      {/* Inner circles */}
      <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(230,168,23,0.35)" strokeWidth="1" />
      <circle cx="200" cy="200" r="70"  fill="none" stroke="rgba(230,168,23,0.25)" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="30"  fill="none" stroke="rgba(230,168,23,0.4)"  strokeWidth="1" />
    </svg>
  );
}
