import { useState, useEffect, useRef } from "react";

const HP_MAX = 100;

export default function HealthBar({ youHealth = 78, name, top, left }) {
  const [hp, setHp] = useState(youHealth);
  const [drainWidth, setDrainWidth] = useState(youHealth);
  const drainTimer = useRef(null);

  // ✅ FIX — sync internal state when prop changes
  useEffect(() => {
    setHp(youHealth);
  }, [youHealth]);

  useEffect(() => {
    if (hp < drainWidth) {
      clearTimeout(drainTimer.current);
      drainTimer.current = setTimeout(() => setDrainWidth(hp), 350);
    } else {
      setDrainWidth(hp);
    }
  }, [hp]);

  const pct = (hp / HP_MAX) * 100;
  const barColor =
    pct > 50 ? "linear-gradient(90deg,#cc0000,#ff2200,#ff5500,#ff2200)"
    : pct > 25 ? "linear-gradient(90deg,#993300,#cc5500,#ff6600,#cc5500)"
    : "linear-gradient(90deg,#660000,#990000,#cc0000,#990000)";

  return (
    <div style={{
      position: "fixed", top: top, left: left, zIndex: 100,
      fontFamily: "'Press Start 2P', monospace",
      filter: "drop-shadow(0 0 12px rgba(255,60,60,0.5))",
    }}>
      {/* Label row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 9, color: "#ff4444", textShadow: "0 0 8px #f00, 0 0 2px #fff", letterSpacing: 2 }}>
          ♥ {name}
        </span>
        <span style={{ fontSize: 9, color: "#ffaa00", textShadow: "0 0 6px #f80" }}>
          {hp} / {HP_MAX}
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        width: 280, height: 22,
        background: "#0a0010",
        border: "2px solid #550000",
        boxShadow: "inset 0 0 8px rgba(0,0,0,0.8), 0 0 0 1px #220000",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ghost / drain bar */}
        <div style={{
          position: "absolute", inset: 0,
          width: `${(drainWidth / HP_MAX) * 100}%`,
          background: "#ff9900", opacity: 0.35,
          transition: "width 1s ease 0.3s",
        }} />

        {/* Health fill */}
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: barColor,
          transition: "width 0.4s cubic-bezier(0.25,1,0.5,1)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gloss sheen */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.06) 40%,transparent 41%)",
          }} />
          {/* Vertical tick marks */}
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ flex: 1, borderRight: "1px solid rgba(0,0,0,0.25)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}