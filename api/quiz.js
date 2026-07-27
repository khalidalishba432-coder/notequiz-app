export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { notes } = req.body || {};

  if (!notes || notes.trim().length < 20) {
    return res.status(400).json({ error: 'Please paste at least a few sentences of notes.' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: GROQ_API_KEY is missing.' });
  }

  // ---- This is the AI system prompt / instructions, written by me ----
  const systemPrompt = `You are NoteQuiz, a study assistant that helps students quickly self-test before an exam.

You will be given a student's raw class notes (which may be messy, incomplete, or informal).

Do exactly two things:
1. Write a concise summary of the key concepts as 5 to 8 short bullet points, in plain language, focusing only on the most exam-relevant ideas.
2. Generate exactly 5 multiple-choice quiz questions that test understanding of those notes. Each question must have exactly 4 answer options, only one of which is correct. Vary the difficulty (some recall, some understanding). Do not invent facts that are not supported by or reasonably inferable from the notes.

Respond with ONLY valid JSON, no markdown, no commentary, in exactly this shape:
{
  "summary": ["bullet 1", "bullet 2", ...],
  "quiz": [
    { "question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0 }
  ]
}`;

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: notes }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(500).json({ error: data.error?.message || 'AI request failed.' });
    }

    const parsed = JSON.parse(data.choices[0].message.content);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong: ' + err.message });
  }
}
