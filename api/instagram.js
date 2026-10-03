/**
 * EditCraftStudio - 100% Free Instagram Webhook & AI Auto-DM Bot
 * Hosted as a Serverless Function on Vercel
 * Endpoint: https://aaravsinh-rathod-portfolio-9.vercel.app/api/instagram
 */

const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN || 'editcraft_meta_2026';
const INSTAGRAM_PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

async function generateGeminiReply(userMessage) {
  try {
    const systemPrompt = `You are the AI assistant for Aaravsinh Rathod, founder of EditCraftStudio.
You reply to Instagram direct messages professionally, friendly, and concisely.
Include his portfolio link https://aaravsinh-rathod-portfolio-9.vercel.app/ naturally when relevant.
Sign off as Aaravsinh Rathod.

Official EditCraftStudio pricing tiers (mention prices are estimates and depend on scope):
Website Development:
- Basic: single-page landing page, basic SEO, contact form - Rs 15,000
- Pro: up to 5 pages, advanced SEO, analytics - Rs 35,000
- Custom: custom web app / e-commerce, full integrations - Rs 75,000

Automation Bot:
- Basic: simple task automation, single platform - Rs 10,000
- Pro: multi-platform workflow, scheduling, error handling - Rs 25,000
- Custom: complex AI integrations, custom API endpoints - Rs 50,000

Keep the message concise and formatted for Instagram direct messaging (use clean line breaks and emojis). Offer a quick discovery call to discuss their project.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nClient Message: "${userMessage}"\n\nGenerate Instagram reply:` }]
          }
        ]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    }
  } catch (err) {
    console.error('Gemini error:', err);
  }

  // Fallback high-converting response
  return `Hi there! 👋 Thanks for reaching out to EditCraftStudio.

I'm Aaravsinh Rathod. We specialize in modern high-converting websites and custom automation bots.

Check out our recent work & client demos here:
🌐 https://aaravsinh-rathod-portfolio-9.vercel.app/

Would you like to schedule a quick 10-minute discovery chat to discuss your project? Let me know what you have in mind!`;
}

async function sendInstagramMessage(recipientId, text) {
  const token = INSTAGRAM_PAGE_ACCESS_TOKEN;
  if (!token) {
    console.error('INSTAGRAM_PAGE_ACCESS_TOKEN is not configured.');
    return;
  }

  try {
    const url = `https://graph.facebook.com/v20.0/me/messages?access_token=${token}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: text }
      })
    });
    const result = await res.json();
    console.log('Instagram API send result:', result);
  } catch (err) {
    console.error('Error sending Instagram message:', err);
  }
}

export default async function handler(req, res) {
  // 1. Meta Webhook Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Meta Webhook Verified Successfully!');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Verification token mismatch');
  }

  // 2. Incoming Instagram Events (POST)
  if (req.method === 'POST') {
    const body = req.body;

    if (body && body.object === 'instagram') {
      const entries = body.entry || [];
      for (const entry of entries) {
        // Direct messages
        const messagings = entry.messaging || [];
        for (const event of messagings) {
          if (event.message && !event.message.is_echo && event.message.text) {
            const senderId = event.sender.id;
            const userText = event.message.text;
            console.log(`Received DM from ${senderId}: "${userText}"`);

            // Generate AI reply and send back
            const reply = await generateGeminiReply(userText);
            await sendInstagramMessage(senderId, reply);
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    }

    return res.status(200).send('IGNORED');
  }

  return res.status(405).send('Method Not Allowed');
}
