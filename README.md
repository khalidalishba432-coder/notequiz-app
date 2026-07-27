# NoteQuiz

**NoteQuiz** turns your messy class notes into an instant summary and a 5-question self-test quiz.

### The problem it solves
Students cramming before an exam often have pages of raw, disorganized notes and no time to turn them into study material. Making your own practice questions is one of the best ways to check if you actually understand something — but it's slow to do by hand. NoteQuiz does it in seconds, for any student, on any subject.

### 🔗 Live app
https://notequiz-5o3g8b5qb-khalidalishba432-coders-projects.vercel.app/
### Features
- Paste any raw class notes (any subject, any length)
- Get an AI-generated 5–8 bullet point summary of the key concepts
- Get an AI-generated 5-question multiple-choice quiz to self-test
- Interactive quiz: click an answer, get instant right/wrong feedback
- Live score tracker as you answer
- Clean, responsive, single-page UI — works on mobile

### The AI feature
NoteQuiz's core feature is powered by an LLM (Llama 3.3 70B via the Groq API). When a user submits their notes, the backend sends them to the model with this system prompt (written by me):

> You are NoteQuiz, a study assistant that helps students quickly self-test before an exam.
> You will be given a student's raw class notes (which may be messy, incomplete, or informal).
> Do exactly two things:
> 1. Write a concise summary of the key concepts as 5 to 8 short bullet points, in plain language, focusing only on the most exam-relevant ideas.
> 2. Generate exactly 5 multiple-choice quiz questions that test understanding of those notes. Each question must have exactly 4 answer options, only one of which is correct. Vary the difficulty (some recall, some understanding). Do not invent facts that are not supported by or reasonably inferable from the notes.
> Respond with ONLY valid JSON in a fixed schema.

The model's JSON response is parsed on the server and rendered into the interactive summary + quiz UI.

### Tools, services, and models used
- **Frontend:** Plain HTML/CSS/JavaScript (no framework)
- **Backend:** Vercel Serverless Function (Node.js)
- **AI model:** Llama 3.3 70B via [Groq API](https://groq.com) (free tier)
- **Hosting/Deployment:** Vercel (free tier)
- **Version control:** GitHub

### Screenshots
1. The empty app with notes pasted in ss2.png
   "C:\Users\USER\OneDrive\图片\ss2.png"
2. The generated summary + quiz ss3.png
   "C:\Users\USER\OneDrive\图片\ss3.png"
3. A finished quiz showing the score / right-wrong feedback  ss1.png
   "C:\Users\USER\OneDrive\图片\ss1.png"

```
### How to run this project locally
1. Clone the repo:
   ```
   C:\Users\USER\OneDrive\Desktop\ai-career-navigator\ai-career-navigator\notequiz-app
   cd notequiz
   ```
2. Install the [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
3. Get a free API key from [console.groq.com](https://console.groq.com) (sign up, no credit card needed)
4. Create a `.env.local` file in the project root:
   ```
   GROQ_API_KEY=your_key_here
   ```
5. Run locally:
   ```
   vercel dev
   ```
6. Open `http://localhost:3000`

### Deploying your own copy
1. Push this repo to your own public GitHub account
2. Go to [vercel.com](https://vercel.com) → New Project → import your GitHub repo
3. In Project Settings → Environment Variables, add `GROQ_API_KEY` with your key
4. Deploy — Vercel gives you a live public URL automatically
