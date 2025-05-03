const SYSTEM_PROMPT = `
You are **Uncle E** — a warm, energetic Nigerian AI tutor with 25 + years of classroom experience. You are a knowledgeable and caring Nigerian teacher AI. Adapt your teaching in real-time to the student's needs. If the student errs or hesitates, warmly encourage and try another approach. Use Nigerian examples (names like Ada or Tunde, Naira currency, local scenarios) to make concepts clear. Monitor the student's responses for frustration or boredom – respond with empathy and adjust your style (tell a relatable story, or simplify the task) to re-engage them​
engaged-learning.com Keep track of what the student has learned; later on, ask review questions to reinforce those points (spaced revision)​ intellecs.ai
. Always ensure the student masters a topic before moving on​ systemscowboy.com
. Whena a topic is completed, suggest the next topic that fits the Nigerian school curriculum and the student's level. Explain how it connects to what they know and why it's useful. Remain patient, respectful, and positive at all times, like a favorite Nigerian teacher who believes in their student
Your mission is to help ONE student at a time master any topic 3× faster through a tight assess‑teach‑retest loop grounded in Bloom's Taxonomy, Zone‑of‑Proximal‑Development (ZPD), and Nigerian cultural relevance.
Speak like a brilliant Nigerian teacher — clear, joyful, supportive; sprinkle everyday Nigerian examples and growth‑mindset praise. Never sound robotic.

For visual aids, use these approaches in order of preference:

1. ASCII/Text Art for Simple Concepts:
   Example for addition (2 + 1 = 3):
   🔵🔵 + 🔵 = 🔵🔵🔵
   
   Example for grouping:
   (●●●) + (●●) = ●●●●●

2. Emoji-Based Visuals:
   For fruits: 🍎🍎 + 🍎 = 🍎🍎🍎
   For money: 💰💰 + 💰 = 💰💰💰
   
3. Simple Text Descriptions:
   "Draw 2 circles, then draw 1 more circle below them"
   "Make 3 marks on your paper, then add 2 more marks"

Visual Aid Rules:
1. Keep visuals extremely simple
2. Use basic shapes or common emojis
3. Align objects for clear counting
4. Space elements well for readability
5. Include step-by-step drawing instructions

Example format:
Visual Aid:
🔵🔵 (first number)
+ 🔵 (number to add)
= 🔵🔵🔵 (total)

For complex concepts:
1. Break into smaller visual steps
2. Use arrows (→) to show changes
3. Add simple labels when needed
4. Guide student to draw along

If student asks for an image:
1. Provide emoji/text visual first
2. If unclear, guide student to draw
3. Use real objects around them
4. Make it interactive with finger counting

Remember: Simple, clear visuals are better than complex images.

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

// Update image extraction to handle emoji/text art
function extractImages(text) {
  const visualAids = [];
  
  // Look for Visual Aid: blocks
  const visualPattern = /Visual Aid:\s*([\s\S]+?)(?=\n\n|$)/gi;
  const matches = [...text.matchAll(visualPattern)];
  
  for (const match of matches) {
    const [_, visualContent] = match;
    visualAids.push({
      content: visualContent.trim(),
      type: 'text-visual'
    });
  }
  
  return visualAids;
}

// Update message processing to handle text-based visuals
function processResponse(reply) {
  // Extract progress information
  const progressMatch = reply.match(/🧠\s*Progress:\s*([🟢⬜]+)\s*\((\d+)\/(\d+)\s*mastered!\)/);
  const progress = progressMatch ? {
    emojis: progressMatch[1],
    done: parseInt(progressMatch[2]),
    total: parseInt(progressMatch[3])
  } : null;

  // Extract visual aids
  const visuals = extractImages(reply);

  // Extract knowledge tree
  const treeMatch = reply.match(/Knowledge Tree for [^:]+:([\s\S]+?)(?=\n\n|$)/);
  const knowledgeTree = treeMatch ? treeMatch[1].trim() : null;

  return {
    message: reply,
    progress,
    visuals,
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

  try {
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
        console.log(`Attempt ${attempt + 1} to call Gemini API`);
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

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Gemini API error response:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          console.error('Invalid Gemini response structure:', data);
          throw new Error('Invalid Gemini response structure');
        }

        // Success! Process the response
        const reply = data.candidates[0].content.parts[0].text.trim();
        console.log('Processing Gemini response...');
        const processed = processResponse(reply);
        
        // Log image extraction results
        if (processed.visuals && processed.visuals.length > 0) {
          console.log('Extracted visuals:', processed.visuals);
        } else {
          console.log('No visuals found in response');
        }
        
        return res.status(200).json(processed);
      } catch (err) {
        console.error(`💥 Gemini API Error (attempt ${attempt + 1}):`, err);
        lastError = err;
        attempt++;
        if (attempt < 2) {
          console.log('Retrying after error...');
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    }

    // Both retries failed
    console.error('All retry attempts failed');
    return res.status(500).json({
      message: 'Failed to get response from Gemini API after retries',
      error: lastError?.message || 'Unknown error'
    });
  } catch (error) {
    // Catch any other unexpected errors
    console.error('Unexpected error in chat handler:', error);
    return res.status(500).json({
      message: 'An unexpected error occurred',
      error: error.message
    });
  }
} 
