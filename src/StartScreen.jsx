import { useState, useEffect } from "react";



export default function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState("");
  const [screen, setScreen] = useState("menu"); 
  const [vsPhase, setVsPhase] = useState(0);


  function handleStart() {
    if (!playerName.trim()) return;
    setScreen("vs");
    
    setTimeout(() => setVsPhase(1), 100);
    setTimeout(() => setVsPhase(2), 800);
    setTimeout(() => setVsPhase(3), 1500);
    setTimeout(() => setVsPhase(4), 2200);
    setTimeout(() => setVsPhase(5), 2700);
    setTimeout(() => onStart(playerName.trim()), 3100);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ss-root {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: #04040a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── animated background grid ── */
        .ss-grid {
          position: absolute;
          inset: -50%;
          background-image:
            linear-gradient(rgba(255,200,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,200,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPan 20s linear infinite;
        }
        @keyframes gridPan {
          from { transform: translate(0,0); }
          to   { transform: translate(60px,60px); }
        }

        /* ── vignette ── */
        .ss-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, #04040a 100%);
          pointer-events: none;
        }

        /* ══════════════════════
             MENU SCREEN
        ══════════════════════ */
        .ss-menu {
          position: relative;
          z-index: 2;
          width: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          animation: menuIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* title */
        .ss-game-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 13px;
          color: #ffc200;
          letter-spacing: 8px;
          text-transform: uppercase;
          text-shadow: 0 0 20px #ffc20088;
          margin-bottom: 6px;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { text-shadow: 0 0 20px #ffc20088; }
          50%      { text-shadow: 0 0 40px #ffc200cc, 0 0 80px #ffc20044; }
        }

        .ss-subtitle {
          font-size: 52px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 4px;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 48px;
          text-shadow: 4px 4px 0 #ffc200, 8px 8px 0 #b88a00;
        }

        /* card */
        .ss-card {
          width: 100%;
          border: 2px solid #ffc20044;
          background: rgba(255,194,0,0.04);
          padding: 40px 48px;
          position: relative;
        }
        .ss-card::before, .ss-card::after {
          content: '';
          position: absolute;
          width: 16px; height: 16px;
          border-color: #ffc200;
          border-style: solid;
        }
        .ss-card::before { top: -2px; left: -2px;  border-width: 2px 0 0 2px; }
        .ss-card::after  { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

        /* name input section */
        .ss-section-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          color: #ffc200;
          letter-spacing: 4px;
          margin-bottom: 14px;
        }
        .ss-input-wrap {
          position: relative;
          margin-bottom: 36px;
        }
        .ss-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid #ffc20066;
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 3px;
          padding: 8px 0 8px 4px;
          outline: none;
          text-transform: uppercase;
          transition: border-color 0.2s;
          caret-color: #ffc200;
        }
        .ss-input::placeholder { color: #ffffff22; }
        .ss-input:focus { border-bottom-color: #ffc200; }
        .ss-input-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0;
          background: #ffc200;
          box-shadow: 0 0 10px #ffc200;
          transition: width 0.3s ease;
        }
        .ss-input:focus ~ .ss-input-line { width: 100%; }

        /* divider */
        .ss-divider {
          border: none;
          border-top: 1px solid #ffc20022;
          margin: 0 0 32px;
        }

        /* controls grid */
        .ss-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 32px;
          margin-bottom: 36px;
        }
        .ss-ctrl {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ss-key {
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          color: #04040a;
          background: #ffc200;
          padding: 5px 8px;
          min-width: 44px;
          text-align: center;
          border-radius: 3px;
          box-shadow: 0 3px 0 #a07a00;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .ss-ctrl-desc {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff99;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        /* start button */
        .ss-btn {
          width: 100%;
          font-family: 'Press Start 2P', monospace;
          font-size: 12px;
          letter-spacing: 3px;
          color: #04040a;
          background: #ffc200;
          border: none;
          padding: 18px;
          cursor: pointer;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 0 #a07a00, 0 0 30px #ffc20044;
          transition: all 0.1s;
        }
        .ss-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: btnSheen 2.5s ease-in-out infinite;
        }
        @keyframes btnSheen {
          0%   { left: -100%; }
          60%  { left: 150%; }
          100% { left: 150%; }
        }
        .ss-btn:hover  { background: #ffd440; box-shadow: 0 6px 0 #a07a00, 0 0 50px #ffc20088; }
        .ss-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #a07a00; }
        .ss-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .ss-btn:disabled::before { display: none; }

        /* ══════════════════════
             VS SCREEN
        ══════════════════════ */
        .ss-vs-screen {
          position: relative;
          z-index: 2;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* flash overlay */
        .ss-flash {
          position: fixed;
          inset: 0;
          background: #fff;
          z-index: 10;
          animation: flashAnim 0.5s ease forwards;
        }
        @keyframes flashAnim {
          0%   { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }

        /* fighters */
        .ss-fighters {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 100%;
          position: relative;
        }

        .ss-fighter {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 320px;
          transition: transform 0.7s cubic-bezier(0.34,1.2,0.64,1), opacity 0.5s ease;
          opacity: 0;
        }
        .ss-fighter.player { transform: translateX(-200px); }
        .ss-fighter.enemy  { transform: translateX(200px);  }
        .ss-fighter.player.show { opacity: 1; transform: translateX(0); }
        .ss-fighter.enemy.show  { opacity: 1; transform: translateX(0); }

        .ss-fighter-portrait {
          width: 160px;
          height: 160px;
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 72px;
          position: relative;
          overflow: hidden;
        }
        .ss-fighter-portrait::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
        }
        .player .ss-fighter-portrait {
          border-color: #ffc200;
          background: linear-gradient(135deg, #1a1200, #2e2000);
          box-shadow: 0 0 30px #ffc20066, inset 0 0 20px #ffc20022;
        }
        .enemy .ss-fighter-portrait {
          border-color: #ff2020;
          background: linear-gradient(135deg, #1a0000, #2e0a0a);
          box-shadow: 0 0 30px #ff202066, inset 0 0 20px #ff202022;
        }

        .ss-fighter-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-align: center;
          line-height: 1.6;
        }
        .player .ss-fighter-name { color: #ffc200; text-shadow: 0 0 12px #ffc20066; }
        .enemy  .ss-fighter-name { color: #ff2020; text-shadow: 0 0 12px #ff202066; }

        .ss-fighter-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        .player .ss-fighter-tag { color: #ffc20077; }
        .enemy  .ss-fighter-tag { color: #ff202077; }

        /* VS badge */
        .ss-vs-badge {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 -20px;
          opacity: 0;
          transform: scale(2.5) rotate(-15deg);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .ss-vs-badge.show {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .ss-vs-inner {
          font-family: 'Press Start 2P', monospace;
          font-size: 52px;
          color: #fff;
          text-shadow: 4px 4px 0 #cc0000, -4px -4px 0 #ffc200, 0 0 40px #ffffff88;
          animation: vsPulse 0.6s ease-in-out infinite alternate;
        }
        @keyframes vsPulse {
          from { text-shadow: 4px 4px 0 #cc0000, -4px -4px 0 #ffc200, 0 0 40px #ffffff88; }
          to   { text-shadow: 4px 4px 0 #cc0000, -4px -4px 0 #ffc200, 0 0 80px #ffffffcc; }
        }

        /* FIGHT banner */
        .ss-fight-banner {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          font-family: 'Press Start 2P', monospace;
          font-size: 28px;
          color: #04040a;
          background: #ffc200;
          padding: 14px 48px;
          letter-spacing: 6px;
          white-space: nowrap;
          box-shadow: 0 6px 0 #a07a00, 0 0 60px #ffc200aa;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ss-fight-banner.show {
          transform: translateX(-50%) scaleX(1);
        }

        /* health bars in vs screen */
        .ss-vs-hbars {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          display: flex;
          gap: 16px;
          align-items: center;
          opacity: 0;
          transition: opacity 0.4s ease 0.5s;
        }
        .ss-vs-hbars.show { opacity: 1; }
        .ss-hbar-wrap { flex: 1; }
        .ss-hbar-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          margin-bottom: 6px;
          text-align: center;
        }
        .ss-hbar-label.p { color: #ffc200; }
        .ss-hbar-label.e { color: #ff2020; }
        .ss-hbar-track {
          height: 16px;
          background: #111;
          border: 1px solid #333;
          overflow: hidden;
        }
        .ss-hbar-fill {
          height: 100%;
          width: 0%;
          transition: width 0.8s ease 1s;
        }
        .ss-hbar-fill.show { width: 100%; }
        .ss-hbar-fill.p { background: linear-gradient(90deg, #ffa500, #ffc200); box-shadow: 0 0 8px #ffc20066; }
        .ss-hbar-fill.e { background: linear-gradient(90deg, #cc0000, #ff2020); box-shadow: 0 0 8px #ff202066; }
        .ss-hbar-sep {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          color: #555;
        }
      `}</style>

      <div className="ss-root">
        <div className="ss-grid" />
        <div className="ss-vignette" />

        {/* ── MENU ── */}
        {screen === "menu" && (
          <div className="ss-menu">
            <p className="ss-game-title">⚔ Fighter Arena ⚔</p>
            <h1 className="ss-subtitle">Enter Your Name</h1>

            <div className="ss-card">
              <p className="ss-section-title">▸ Player 1</p>
              <div className="ss-input-wrap">
                <input
                  className="ss-input"
                  type="text"
                  maxLength={12}
                  placeholder="YOUR NAME"
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleStart()}
                  autoFocus
                />
                <div className="ss-input-line" />
              </div>

              <hr className="ss-divider" />

              <p className="ss-section-title">▸ Controls</p>
              <div className="ss-controls">
                <div className="ss-ctrl">
                  <span className="ss-key">→</span>
                  <span className="ss-ctrl-desc">Move Right</span>
                </div>
                <div className="ss-ctrl">
                  <span className="ss-key">←</span>
                  <span className="ss-ctrl-desc">Move Left</span>
                </div>
                <div className="ss-ctrl">
                  <span className="ss-key">↑</span>
                  <span className="ss-ctrl-desc">Jump</span>
                </div>
                <div className="ss-ctrl">
                  <span className="ss-key">A</span>
                  <span className="ss-ctrl-desc">Attack</span>
                </div>
                <div className="ss-ctrl">
                  <span className="ss-key">S</span>
                  <span className="ss-ctrl-desc">Jump Attack</span>
                </div>
                <div className="ss-ctrl">
                  <span className="ss-key">ENTER</span>
                  <span className="ss-ctrl-desc">Start Game</span>
                </div>
              </div>

              <hr className="ss-divider" />

              <button
                className="ss-btn"
                onClick={handleStart}
                disabled={!playerName.trim()}
              >
                ▶ &nbsp; Fight !
              </button>
            </div>
          </div>
        )}

        {/* ── VS INTRO ── */}
        {screen === "vs" && (
          <div className="ss-vs-screen">

            {/* top health bars */}
            <div className={`ss-vs-hbars ${vsPhase >= 2 ? "show" : ""}`}>
              <div className="ss-hbar-wrap">
                <div className="ss-hbar-label p">{playerName}</div>
                <div className="ss-hbar-track">
                  <div className={`ss-hbar-fill p ${vsPhase >= 2 ? "show" : ""}`} />
                </div>
              </div>
              <span className="ss-hbar-sep">VS</span>
              <div className="ss-hbar-wrap">
                <div className="ss-hbar-label e">Enemy</div>
                <div className="ss-hbar-track">
                  <div className={`ss-hbar-fill e ${vsPhase >= 2 ? "show" : ""}`} />
                </div>
              </div>
            </div>

            {/* fighters + VS badge */}
            <div className="ss-fighters">
              <div className={`ss-fighter player ${vsPhase >= 1 ? "show" : ""}`}>
                <div className="ss-fighter-portrait">🥷</div>
                <div>
                  <p className="ss-fighter-tag">Player 1</p>
                  <p className="ss-fighter-name">{playerName}</p>
                </div>
              </div>

              <div className={`ss-vs-badge ${vsPhase >= 3 ? "show" : ""}`}>
                <span className="ss-vs-inner">VS</span>
              </div>

              <div className={`ss-fighter enemy ${vsPhase >= 2 ? "show" : ""}`}>
                <div className="ss-fighter-portrait">👺</div>
                <div>
                  <p className="ss-fighter-tag">CPU</p>
                  <p className="ss-fighter-name">Enemy</p>
                </div>
              </div>
            </div>

            {/* FIGHT banner */}
            <div className={`ss-fight-banner ${vsPhase >= 4 ? "show" : ""}`}>
              ⚡ FIGHT! ⚡
            </div>

            {/* white flash */}
            {vsPhase >= 5 && <div className="ss-flash" />}
          </div>
        )}
      </div>
    </>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO USE IN App.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Import at the top of App.js:
   import StartScreen from './StartScreen';

2. Add state inside App():
   const [gameStarted, setGameStarted] = useState(false);
   const [playerName, setPlayerName]   = useState("");

3. Add handler:
   function handleGameStart(name) {
     setPlayerName(name);
     setGameStarted(true);
   }

4. In your return, wrap everything with a conditional:
   return (
     <>
       {!gameStarted && <StartScreen onStart={handleGameStart} />}

       {gameStarted && (
         <>
           ...your existing game JSX...

           <GameOverScreen
             isOver={isOver}
             youHealth={youHealth}
             enemyHealth={enemyHelath}
             onRestart={() => {
               setGameStarted(false); // goes back to start screen
               // ...reset all your other state here
             }}
           />
         </>
       )}
     </>
   );

5. Optionally show playerName in the HealthBar:
   <HealthBar youHealth={youHealth} name={playerName} ... />
*/