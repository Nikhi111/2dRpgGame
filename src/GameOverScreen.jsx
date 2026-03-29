import { useEffect, useState } from "react";



export default function GameOverScreen({ isOver, youHealth, enemyHealth, onRestart }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const didWin = isOver && enemyHealth <= 0;

  useEffect(() => {
    if (isOver) {
     
      setTimeout(() => setVisible(true), 800);
      setTimeout(() => setAnimate(true), 900);
    } else {
      setVisible(false);
      setAnimate(false);
    }
  }, [isOver]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@500;700&display=swap');

        .go-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(3px);
          animation: fadeOverlay 0.4s ease forwards;
        }

        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── card ── */
        .go-card {
          position: relative;
          width: 520px;
          padding: 56px 48px 44px;
          text-align: center;
          border: 3px solid;
          overflow: hidden;
          transform: scale(0.6) translateY(60px);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1),
                      opacity   0.4s ease;
        }
        .go-card.show {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        /* win vs lose colours */
        .go-card.win  {
          background: linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 60%, #112211 100%);
          border-color: #39ff14;
          box-shadow: 0 0 40px #39ff1466, 0 0 100px #39ff1422, inset 0 0 30px #39ff1410;
        }
        .go-card.lose {
          background: linear-gradient(160deg, #1a0505 0%, #2b0a0a 60%, #200a0a 100%);
          border-color: #ff2020;
          box-shadow: 0 0 40px #ff202066, 0 0 100px #ff202022, inset 0 0 30px #ff202010;
        }

        /* scanline overlay */
        .go-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.18) 3px,
            rgba(0,0,0,0.18) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* corner brackets */
        .go-card::after {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid;
          pointer-events: none;
          z-index: 1;
        }
        .go-card.win::after  { border-color: #39ff1433; }
        .go-card.lose::after { border-color: #ff202033; }

        /* ── label (YOU WIN / YOU LOSE) ── */
        .go-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 11px;
          letter-spacing: 6px;
          text-transform: uppercase;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }
        .win  .go-label { color: #39ff14; text-shadow: 0 0 12px #39ff14; }
        .lose .go-label { color: #ff2020; text-shadow: 0 0 12px #ff2020; }

        /* ── main title ── */
        .go-title {
          font-family: 'Press Start 2P', monospace;
          line-height: 1.35;
          margin: 0 0 32px;
          position: relative;
          z-index: 2;
        }
        .win  .go-title { font-size: 38px; color: #fff; text-shadow: 0 0 20px #39ff14, 3px 3px 0 #1a6600; }
        .lose .go-title { font-size: 38px; color: #fff; text-shadow: 0 0 20px #ff2020, 3px 3px 0 #660000; }

        /* ── sub text ── */
        .go-sub {
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        .win  .go-sub { color: #a8ffa0; }
        .lose .go-sub { color: #ffaaaa; }

        /* ── health recap ── */
        .go-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        .go-stat {
          text-align: center;
        }
        .go-stat-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .win  .go-stat-label { color: #39ff1499; }
        .lose .go-stat-label { color: #ff202099; }

        .go-stat-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px;
          font-weight: 700;
        }
        .win  .go-stat-value { color: #39ff14; text-shadow: 0 0 8px #39ff1466; }
        .lose .go-stat-value { color: #ff2020; text-shadow: 0 0 8px #ff202066; }

        .go-divider {
          width: 1px;
          height: 50px;
          align-self: center;
        }
        .win  .go-divider { background: #39ff1444; }
        .lose .go-divider { background: #ff202044; }

        /* ── restart button ── */
        .go-btn {
          position: relative;
          z-index: 2;
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          padding: 14px 32px;
          border: 2px solid;
          background: transparent;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.15s ease;
          overflow: hidden;
        }
        .go-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .go-btn:hover::before { opacity: 1; }
        .go-btn:active { transform: scale(0.96); }

        .win .go-btn {
          color: #39ff14;
          border-color: #39ff14;
          box-shadow: 0 0 12px #39ff1433;
          text-shadow: 0 0 8px #39ff14;
        }
        .win .go-btn::before { background: #39ff1418; }
        .win .go-btn:hover   { box-shadow: 0 0 24px #39ff1488; }

        .lose .go-btn {
          color: #ff2020;
          border-color: #ff2020;
          box-shadow: 0 0 12px #ff202033;
          text-shadow: 0 0 8px #ff2020;
        }
        .lose .go-btn::before { background: #ff202018; }
        .lose .go-btn:hover   { box-shadow: 0 0 24px #ff202088; }

        /* ── particles ── */
        .go-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .go-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: floatUp linear infinite;
        }
        @keyframes floatUp {
          0%   { transform: translateY(100%) scale(1);   opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }

        /* ── glitch on title for lose ── */
        .lose .go-title {
          animation: glitch 2.5s infinite;
        }
        @keyframes glitch {
          0%,90%,100% { text-shadow: 0 0 20px #ff2020, 3px 3px 0 #660000; }
          92% {
            text-shadow: -3px 0 #0ff, 3px 0 #f0f, 0 0 20px #ff2020;
            transform: translate(-2px, 0);
          }
          94% {
            text-shadow: 3px 0 #0ff, -3px 0 #f0f, 0 0 20px #ff2020;
            transform: translate(2px, 0);
          }
          96% { text-shadow: 0 0 20px #ff2020, 3px 3px 0 #660000; transform: translate(0); }
        }

        /* ── shimmer on WIN title ── */
        .win .go-title {
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%,100% { text-shadow: 0 0 20px #39ff14, 3px 3px 0 #1a6600; }
          50%     { text-shadow: 0 0 40px #39ff14, 0 0 60px #39ff14aa, 3px 3px 0 #1a6600; }
        }
      `}</style>

      <div className="go-overlay">
        <div className={`go-card ${didWin ? "win" : "lose"} ${animate ? "show" : ""}`}>

          {/* floating particles */}
          <div className="go-particles">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="go-particle"
                style={{
                  left: `${8 + i * 8}%`,
                  bottom: `${Math.random() * 30}%`,
                  background: didWin ? "#39ff14" : "#ff2020",
                  animationDuration: `${1.5 + (i % 4) * 0.5}s`,
                  animationDelay: `${(i * 0.2) % 1.5}s`,
                  width: i % 3 === 0 ? "4px" : "2px",
                  height: i % 3 === 0 ? "4px" : "2px",
                }}
              />
            ))}
          </div>

          <p className="go-label">{didWin ? "★ Victory ★" : "✕ Defeat ✕"}</p>

          <h1 className="go-title">
            {didWin ? (
              <><span>YOU</span><br /><span>WIN!</span></>
            ) : (
              <><span>YOU</span><br /><span>LOSE!</span></>
            )}
          </h1>

          <p className="go-sub">
            {didWin ? "Enemy has been defeated" : "You have been defeated"}
          </p>

          <div className="go-stats">
            <div className="go-stat">
              <div className="go-stat-label">Your HP</div>
              <div className="go-stat-value">{Math.max(0, youHealth)}</div>
            </div>
            <div className="go-divider" />
            <div className="go-stat">
              <div className="go-stat-label">Enemy HP</div>
              <div className="go-stat-value">{Math.max(0, enemyHealth)}</div>
            </div>
          </div>

          <button className="go-btn" onClick={onRestart}>
            ▶ Play Again
          </button>
        </div>
      </div>
    </>
  );
}

