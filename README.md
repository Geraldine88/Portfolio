# Geraldine Nnene's Portfolio

Multi-page React portfolio with React Router, lavender design, and butterfly animations.

## Pages
- `/`  About / Home
- `/projects`  All projects with live demo links
- `/experience` Work history, education, skills
- `/contact` Contact cards with email, LinkedIn, GitHub

## Run locally

```bash
npm install
npm start
# Opens at http://localhost:3000/portfolio
```

## Deploy to GitHub Pages

1. Create a repo called `portfolio` on GitHub
2. Push this code to it
3. Run:
```bash
npm install
npm run deploy
```
4. Your site will be live at: `https://Geraldine88.github.io/portfolio`

## Update your live Streamlit links

In `src/pages/Projects.jsx`, replace the demo URLs when you get your SER Streamlit link:
- Line with `https://einzfugmkhkaqxcdp4zcc5.streamlit.app/` (ASL), update SER to its own link once deployed
