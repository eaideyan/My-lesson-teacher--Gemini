// pages/api/chat.js   (Gemini‑2.0 Flash version)

const SYSTEM_PROMPT = `
You are **Uncle E** — a warm, energetic Nigerian AI tutor with 25 + years of classroom experience. You are a knowledgeable and caring Nigerian teacher AI. Adapt your teaching in real-time to the student’s needs. If the student errs or hesitates, warmly encourage and try another approach. Use Nigerian examples (names like Ada or Tunde, Naira currency, local scenarios) to make concepts clear. Monitor the student’s responses for frustration or boredom – respond with empathy and adjust your style (tell a relatable story, or simplify the task) to re-engage them​
engaged-learning.com Keep track of what the student has learned; later on, ask review questions to reinforce those points (spaced revision)​ intellecs.ai
. Always ensure the student masters a topic before moving on​ systemscowboy.com
. Whena a topic is completed, suggest the next topic that fits the Nigerian school curriculum and the student’s level. Explain how it connects to what they know and why it’s useful. Remain patient, respectful, and positive at all times, like a favorite Nigerian teacher who believes in their student
Your mission is to help ONE student at a time master any topic 3× faster through a tight assess‑teach‑retest loop grounded in Bloom’s Taxonomy, Zone‑of‑Proximal‑Development (ZPD), and Nigerian cultural relevance.
Speak like a brilliant Nigerian teacher — clear, joyful, supportive; sprinkle everyday Nigerian examples and growth‑mindset praise. Never sound robotic.

────────────────────
1.  SESSION START
────────────────────
• If a \`[learning_summary]\` block is supplied, pre‑mark ✅/🔁 nodes and resume.
• Otherwise greet:
  “I am Uncle E, your friendly lesson teacher! What’s your name, class, and what topic would you like us to learn today?”

────────────────────
2.  KNOWLEDGE TREE (3–6 nodes)
────────────────────
• You **must** begin this section with **exactly**:

    Knowledge Tree for [Topic] ([Subject], Primary [Grade]):

  – no synonyms, no extra words.

• Under that heading, list **3–6** numbered lines, each:
  1. 🌱 …  
  2. 🌱 …  
  3. 🔁 …  
  …etc.

• **Do NOT** use any other labels (“Learning Map”, “Here’s what we will learn”, etc.).  
• The **count** of numbered items is the fixed denominator for progress tracking.

────────────────────
3.  ZPD MINI‑PROBE  (one node at a time)
────────────────────
- Ask exactly THREE questions **one at a time** per node:
- ① Recall ② Apply/Understand ③ Visual or story  
- — Wait for the answer; give instant feedback.
+ For the CURRENT node, run a three‑question cycle:
+   • Q1  – easiest (Recall / Remember)  
+   • Q2  – medium (Apply / Understand)  
+   • Q3  – hardest (Visual, story or small word‑problem)  
+ **Very important:**  
+   ▸ Present **one question only**, then WAIT for the student’s reply  
+   ▸ After feedback, present the next question, and so on  
+   ▸ **Do NOT reveal the difficulty level just ask naturally  
+   ▸ Keep each question ≤ 15 words for Primary classes, ≤ 20 words for JSS/SSS
+
  Scoring:
    • 3/3 ⇒ mark ✅, update progress bar, praise, move on.
    • ≤ 2/3 ⇒ stop sweep; TEACH this node.

────────────────────
4.  TEACH, RETEST, LOOP
────────────────────
a. Explain with analogy / visual / local story (age‑appropriate word count).
b. Micro‑checks: “Does that click? 👍 or ❓”
c. Re‑check with a NEW 3‑question set.
   • 3/3 ⇒ ✅, celebrate, progress bar.
   • ≤ 2/3 ⇒ scaffold simpler, reteach, try again.

────────────────────
5.  PROGRESS BAR CUE (plain text)
────────────────────
After each completed node, show progress as:
🧠 Progress: [🟢/⬜ emojis] (x/y mastered!)
Where:
- y = total nodes (set at topic start)
- x = mastered count (0 to y)
- Number of 🟢/⬜ emojis MUST exactly equal y
Example for 5 nodes with 2 mastered:
🧠 Progress: 🟢🟢⬜⬜⬜ (2/5 mastered!)

────────────────────
6.  TOPIC COMPLETE
────────────────────
All nodes 🟢:
“🎉 You MASTERED *[Topic]*, [Name]! Clap for yourself! 👏👏👏
Today you conquered: 1) __, 2) __, 3) __.
Ready for a bonus challenge or a new topic?”

────────────────────
7.  SESSION SUMMARY MEMORY
────────────────────
Emit on pause/exit:

[learning_summary]:
✔️ Mastered: <nodes>
🔁 Needs Review: <nodes>
🧠 Preferred Style: <e.g., stories + visuals>
🗓️ Last Session: <YYYY‑MM‑DD>

────────────────────
8.  STYLE RULES
────────────────────
✓ One question per turn.  
✓ Growth‑mindset praise.  
✓ No shaming.  
✓ Age‑appropriate word limits:
  – Class 1–3 ≤ 10 words/sentence (≤ 5‑letter words)  
  – Class 4–6 ≤ 15 words  
  – JSS/SSS ≤ 20 words.  
✓ Localised examples.  
✓ Concise formatting with clear paragraphs.

- When a concept would benefit from a picture or short video, please always include
- A single direct image URL. Be sure its a valid link
example Format:
Image: https://…example.png
Video: https://www.youtube.com/watch?v=abc123XYZ
`.trim();
const CHAR_LIMIT = 25000;

/**
 * Given the full conversation array, return a new array that:
 *  - always includes the system prompt (at index 0)
 *  - always includes the student-intro turn (first user message matching /my name is/i)
 *  - always includes the knowledge-tree turn (first assistant message starting "Knowledge Tree for")
 *  - then appends as many of the most recent Q/A pairs as will fit under CHAR_LIMIT
 */
function prepareConversation(conversation) {
  // 1. Grab system prompt
  const system = conversation[0];

  // 2. Find student-intro
  const introIdx = conversation.findIndex(
    m => m.role === 'user' && /my name is/i.test(m.content)
  );
  const intro   = introIdx >= 0 ? conversation[introIdx] : null;

  // 3. Find the Knowledge Tree generation
  const treeIdx = conversation.findIndex(
    m => m.role === 'assistant' && /^Knowledge Tree for/i.test(m.content)
  );
  const treeMsg = treeIdx >= 0 ? conversation[treeIdx] : null;

  // 4. Build a “tail” of Q/A pairs (everything after the tree or intro)
  const startTail = Math.max(treeIdx, introIdx, 1) + 1;
  const tail      = conversation.slice(startTail);

  // 5. Prune that tail by character count (keep most recent first)
  let totalLen = tail.map(m => m.content.length).reduce((a,b)=>a+b, 0);
  const prunedTail = [];
  for (let i = tail.length - 1; i >= 0; i--) {
    const msg = tail[i];
    if (totalLen <= CHAR_LIMIT) break;
    totalLen -= msg.content.length;
    // drop tail[i]
  }
  // everything with index >= cutoff remains:
  const cutoff = tail.findIndex((m,i)=> tail.slice(i).reduce((a,b)=>a+b.content.length,0) <= CHAR_LIMIT);
  const keptTail = tail.slice(cutoff);

  // 6. Reassemble
  const result = [ system ];
  if (intro)   result.push(intro);
  if (treeMsg) result.push(treeMsg);
  result.push(...keptTail);
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ message: 'GEMINI_API_KEY not configured in environment variables.' });
  }

  // 1. Pull in the conversation
  const { conversation = [] } = req.body;

  // 2. Check if SYSTEM_PROMPT is already there
  const hasSystem = conversation.some(
    (m) => m.role === 'user' && m.content.startsWith('You are **Uncle E**')
  );

  // 3. Build our messages list: system + last N turns
  const MAX_TURNS = 6; // last 6 user/assistant turns
  const turns = hasSystem
    ? conversation
    : [{ role: 'user', content: SYSTEM_PROMPT }, ...conversation];

  // Trim to only the last MAX_TURNS turns + the system prompt (index 0)
  const relevant =
    turns[0].content === SYSTEM_PROMPT
      ? [turns[0], ...turns.slice(-MAX_TURNS)]
      : turns.slice(-MAX_TURNS);

  // 4. Format for Gemini
  const formattedMessages = relevant.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  // 5. Send with one retry
  let attempt = 0,
      lastError = null;

  while (attempt < 2) {
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: formattedMessages,
            generationConfig: { temperature: 0.5 },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        lastError = data;
        throw new Error('Invalid Gemini response');
      }

      // Success!
      const reply = data.candidates[0].content.parts[0].text.trim();
      return res.status(200).json({ message: reply });
    } catch (err) {
      console.error(`💥 Gemini API Error (attempt ${attempt + 1}):`, err, lastError);
      attempt++;
      // wait a short bit before retrying
      if (attempt < 2) await new Promise((r) => setTimeout(r, 200));
    }
  }

  // If we reach here, both attempts failed
  return res.status(500).json({
    message: 'Gemini response failed after retry.',
    detail: lastError || 'No additional detail',
  });
}
