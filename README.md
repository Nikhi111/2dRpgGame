# ⚔️ Fighter Arena — 2D Browser Fighting Game

A browser-based 1v1 fighting game built with **React** and **Framer Motion**. Battle a relentless CPU opponent using smooth sprite animations, real-time collision detection, and an AI that chases you down.

---

## 🎮 Demo

> Run locally with `npm run dev` — see setup below.

---

## ✨ Features

- 🥷 **Frame-by-frame sprite animations** for movement, attack, jump, and death
- ⚔️ **Attack & Jump Attack** combos
- 🤖 **AI opponent** that chases and attacks in real time
- 💥 **Collision detection** between fighters
- ❤️ **Live health bars** for both player and enemy
- 🏆 **Win / Lose screen** with glowing arcade-style popup
- 🎬 **VS intro cinematic** with staggered fighter reveal animation
- 📝 **Start screen** — enter your name and review controls before the fight
- 🔄 **Full restart** — returns to start screen after each match

---

## 🕹️ Controls

| Key | Action |
|-----|--------|
| `→` Arrow Right | Move right |
| `←` Arrow Left | Move left |
| `↑` Arrow Up | Jump |
| `A` | Attack |
| `S` | Jump Attack |

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| [React](https://react.dev) | UI & game state management |
| [Framer Motion](https://www.framer.com/motion/) | Animations & movement transitions |
| Vite | Build tool & dev server |
| CSS | Styling & health bar UI |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Nikhi111/2dRpgGame.git

# 2. Navigate into the project
cd 2dRpgGame

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
2dRpgGame/
├── public/
│   └── background.jpg         # Arena background image
│   └── *.png                  # Sprite animation frames
├── src/
│   ├── App.jsx                # Main game logic & loop
│   ├── HealthBar.jsx          # Health bar component
│   ├── StartScreen.jsx        # Name input & controls screen
│   ├── GameOverScreen.jsx     # Win / Lose popup
│   └── App.css                # Global styles
├── index.html
└── package.json
```

---

## 🧠 How the AI Works

The CPU enemy runs on a simple interval-based AI loop:

- If the player is **far away** → enemy **runs** toward the player
- If the player is **close** → enemy **attacks**
- The loop fires every `1600ms`, making it reactive but beatable

---

## 🐛 Known Issues

- Hit detection uses DOM `getBoundingClientRect` which can be slightly off after Framer Motion transitions
- No blocking or special moves yet
- Mobile / touch controls not supported

---

## 🔮 Planned Features

- [ ] Block / guard mechanic
- [ ] Special move (charge attack)
- [ ] Sound effects & background music
- [ ] 2-player local multiplayer
- [ ] Multiple character skins
- [ ] Score / round system (best of 3)
- [ ] Mobile touch controls

---

## 📸 Screenshots

> *(Add screenshots of the start screen, VS intro, and gameplay here)*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Sprite assets — *(add your asset source here)*
- Background art — *(add your asset source here)*
- Built with ❤️ using React + Framer Motion
