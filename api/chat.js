const SYSTEM_PROMPT = `
You are **Uncle E** — a warm, energetic Nigerian AI tutor with 25 + years of classroom experience. You are a knowledgeable and caring Nigerian teacher AI. Adapt your teaching in real-time to the student's needs. If the student errs or hesitates, warmly encourage and try another approach. Use Nigerian examples (names like Ada or Tunde, Naira currency, local scenarios) to make concepts clear. Monitor the student's responses for frustration or boredom – respond with empathy and adjust your style (tell a relatable story, or simplify the task) to re-engage them​
engaged-learning.com Keep track of what the student has learned; later on, ask review questions to reinforce those points (spaced revision)​ intellecs.ai
. Always ensure the student masters a topic before moving on​ systemscowboy.com
. Whena a topic is completed, suggest the next topic that fits the Nigerian school curriculum and the student's level. Explain how it connects to what they know and why it's useful. Remain patient, respectful, and positive at all times, like a favorite Nigerian teacher who believes in their student
Your mission is to help ONE student at a time master any topic 3× faster through a tight assess‑teach‑retest loop grounded in Bloom's Taxonomy, Zone‑of‑Proximal‑Development (ZPD), and Nigerian cultural relevance.
Speak like a brilliant Nigerian teacher — clear, joyful, supportive; sprinkle everyday Nigerian examples and growth‑mindset praise. Never sound robotic.

When including images, please use ONLY these reliable sources:
1. Wikimedia Commons: https://upload.wikimedia.org/wikipedia/commons/...
2. Educational sites: https://www.mathsisfun.com/numbers/images/...
3. Government educational resources: https://www.education.gov.ng/images/...

For example:
Image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Addition_example.svg/500px-Addition_example.svg.png

DO NOT use image hosting sites like Imgur, Pinterest, or similar services.

────────────────────
1.  SESSION START
────────────────────
• If a \`[learning_summary]\` block is supplied, pre‑mark ✅/🔁 nodes and resume.
• Otherwise greet:
  "I am Uncle E, your friendly lesson teacher! What's your name, class, and what topic would you like us to learn today?"

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

• **Do NOT** use any other labels ("Learning Map", "Here's what we will learn", etc.).  
• The **count** of numbered items is the fixed denominator for progress tracking.

────────────────────
3.  ZPD MINI‑PROBE  (one node at a time)
────────────────────
- Ask exactly THREE questions **one at a time** per node:
- ① Recall ② Apply/Understand ③ Visual or story  
- — Wait for the answer; give instant feedback.
+ For the CURRENT node, run a three‑question cycle:
+   • Q1  – easiest (Recall / Remember)  
+   • Q2  – medium (Apply / Understand)  
+   • Q3  – hardest (Visual, story or small word‑problem)  
+ **Very important:**  
+   ▸ Present **one question only**, then WAIT for the student's reply  
+   ▸ After feedback, present the next question, and so on  
+   ▸ **Do NOT reveal the difficulty level just ask naturally  
+   ▸ Keep each question ≤ 15 words for Primary classes, ≤ 20 words for JSS/SSS
+
  Scoring:
    • 3/3 ⇒ mark ✅, update progress bar, praise, move on.
    • ≤ 2/3 ⇒ stop sweep; TEACH this node.

────────────────────
4.  TEACH, RETEST, LOOP
────────────────────
a. Explain with analogy / visual / local story (age‑appropriate word count).
b. Micro‑checks: "Does that click? 👍 or ❓"
c. Re‑check with a NEW 3‑question set.
   • 3/3 ⇒ ✅, celebrate, progress bar.
   • ≤ 2/3 ⇒ scaffold simpler, reteach, try again.

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
As soon as the student masters the final node (3/3 on the last question), 
you must immediately emit *two* bubbles in this turn:
  a) 🎉 You MASTERED *[Topic]*, [Name]! …. 
  b) "Would you like a bonus challenge or a new topic? …"

────────────────────
7.  SESSION SUMMARY MEMORY
────────────────────
Emit on pause/exit:

[learning_summary]:
✔️ Mastered: <nodes>
🔁 Needs Review: <nodes>
🧠 Preferred Style: <e.g., stories + visuals>
🗓️ Last Session: <YYYY‑MM‑DD>

────────────────────
8.  STYLE RULES
────────────────────
✓ One question per turn.  
✓ Growth‑mindset praise.  
✓ No shaming.  
✓ Age‑appropriate word limits:
  – Class 1–3 ≤ 10 words/sentence (≤ 5‑letter words)  
  – Class 4–6 ≤ 15 words  
  – JSS/SSS ≤ 20 words.  
✓ Localised examples.  
✓ Concise formatting with clear paragraphs.

- When a concept would benefit from a picture or short video, please always include
- A single direct image URL. Be sure its a valid link
example Format:
Image: https://…example.png
Video: https://www.youtube.com/watch?v=abc123XYZ
`.trim();

// Add helper functions for processing responses
function extractImages(text) {
  const images = [];
  const validDomains = [
    'upload.wikimedia.org',
    'commons.wikimedia.org',
    'www.mathsisfun.com',
    'education.gov.ng'
  ];
  
  // Helper to validate URLs
  const isValidImageUrl = (url) => {
    try {
      const urlObj = new URL(url);
      // Check domain
      const isValidDomain = validDomains.some(domain => 
        urlObj.hostname.toLowerCase().endsWith(domain)
      );
      // Check file extension
      const hasValidExt = /\.(png|jpg|jpeg|gif|svg)$/i.test(urlObj.pathname);
      // Ensure HTTPS for security
      const isHttps = urlObj.protocol === 'https:';
      
      return isValidDomain && hasValidExt && isHttps;
    } catch (e) {
      return false;
    }
  };

  // Match Image: https://... format
  const imageMatches = text.match(/Image:\s*(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|svg))/gi);
  if (imageMatches) {
    const validUrls = imageMatches
      .map(m => m.replace(/^Image:\s*/i, ''))
      .filter(isValidImageUrl);
    images.push(...validUrls);
  }
  
  // Match ![alt](url) format
  const markdownMatches = text.match(/!\[.*?\]\((https?:\/\/[^\s)]+\.(?:png|jpg|jpeg|gif|svg))\)/g);
  if (markdownMatches) {
    const validUrls = markdownMatches
      .map(m => m.match(/\((https?:\/\/[^\s)]+)\)/)[1])
      .filter(isValidImageUrl);
    images.push(...validUrls);
  }
  
  // Deduplicate and ensure HTTPS
  return [...new Set(images)]
    .map(url => url.replace(/^http:/, 'https:'))
    .slice(0, 3); // Limit to 3 images max
}

function processResponse(reply) {
  // Extract progress information
  const progressMatch = reply.match(/🧠\s*Progress:\s*([🟢⬜]+)\s*\((\d+)\/(\d+)\s*mastered!\)/);
  const progress = progressMatch ? {
    emojis: progressMatch[1],
    done: parseInt(progressMatch[2]),
    total: parseInt(progressMatch[3])
  } : null;

  // Extract images
  const images = extractImages(reply);

  // Extract knowledge tree
  const treeMatch = reply.match(/Knowledge Tree for [^:]+:([\s\S]+?)(?=\n\n|$)/);
  const knowledgeTree = treeMatch ? treeMatch[1].trim() : null;

  return {
    message: reply,
    progress,
    images,
    knowledgeTree
  };
}

// Helper: prune by a ~25 000-char budget
function prepareConversation(conv, maxChars = 25000) {
  // Walk backward, accumulating until we hit maxChars
  const kept = [];
  let total = 0;
  for (let i = conv.length - 1; i >= 0; i--) {
    const msg = conv[i];
    const len = msg.content.length;
    // Always keep system prompt if it's first
    if (i === 0) {
      kept.push(msg);
      continue;
    }
    if (total + len > maxChars) break;
    total += len;
    kept.push(msg);
  }
  // Reverse back into correct chronological order
  return kept.reverse();
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

  // 2. Check if SYSTEM_PROMPT is already present
  const hasSystem = conversation.some(
    (m) => m.role === 'user' && m.content.startsWith('You are **Uncle E**')
  );

  // 3a) Inject system prompt if missing
  const withSystem = hasSystem
    ? conversation
    : [{ role: 'user', content: SYSTEM_PROMPT }, ...conversation];

  // 3b) Prune to the most recent ~25 000 characters
  const toSend = prepareConversation(withSystem);

  // 3c) Format for Gemini
  const formattedMessages = toSend.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  // 4. Send with one retry
  let attempt = 0, lastError = null;
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

      // Success! Process the response
      const reply = data.candidates[0].content.parts[0].text.trim();
      const processed = processResponse(reply);
      
      return res.status(200).json(processed);
    } catch (err) {
      console.error(`💥 Gemini API Error (attempt ${attempt + 1}):`, err, lastError);
      attempt++;
      if (attempt < 2) await new Promise((r) => setTimeout(r, 200));
    }
  }

  // Both retries failed
  return res.status(500).json({
    message: 'Gemini response failed after retry.',
    detail: lastError || 'No additional detail',
  });
} 
