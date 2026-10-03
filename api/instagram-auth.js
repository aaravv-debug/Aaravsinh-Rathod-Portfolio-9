/**
 * Instagram 1-Click OAuth Authorization Endpoint
 * Handles Meta Redirect after client clicks "Allow"
 */

export default async function handler(req, res) {
  const { code, error, error_reason, error_description } = req.query;

  // Handle errors or user cancellation
  if (error) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorization Cancelled</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: sans-serif; background: #0b0c10; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
          .card { background: #1f2833; padding: 40px; border-radius: 20px; max-width: 400px; }
          h2 { color: #f87171; }
          a { color: #66fcf1; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>❌ Connection Cancelled</h2>
          <p>${error_description || 'You cancelled the connection request.'}</p>
          <br>
          <a href="/connect">Try Again ➔</a>
        </div>
      </body>
      </html>
    `);
  }

  if (!code) {
    // If accessed directly without code, redirect to /connect
    return res.redirect(302, '/connect.html');
  }

  // Clean code string (strip #_ at the end if Meta adds it)
  const cleanCode = code.replace(/#_$/, '');

  // Log the received authorization code for instant verification
  console.log('Received Instagram OAuth Authorization Code:', cleanCode);

  // Return a stunning success page to the client
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bot Connected! | EditCraftStudio AI</title>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #0a0b10;
          background-image: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
        }
        .card {
          background: rgba(18, 20, 32, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 48px 32px;
          max-width: 460px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 50px rgba(16, 185, 129, 0.2);
          backdrop-filter: blur(20px);
        }
        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
          animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .success-icon svg {
          width: 40px;
          height: 40px;
          fill: white;
        }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        h1 {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #ffffff;
        }
        p {
          font-size: 15px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          font-weight: 700;
          font-size: 13px;
          padding: 8px 18px;
          border-radius: 999px;
          margin-bottom: 28px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 10px #34d399;
        }
        .info-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px;
          font-size: 14px;
          color: #cbd5e1;
          margin-bottom: 28px;
          text-align: left;
        }
        .btn-test {
          display: block;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          box-sizing: border-box;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="success-icon">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <h1>Successfully Authorized!</h1>
        <p>Your Instagram Account is now authorized to run 24/7 AI message auto-replies powered by EditCraftStudio.</p>
        
        <div class="status-badge">
          <span class="dot"></span>
          <span>BOT STATUS: CONNECTED</span>
        </div>

        <div class="info-box">
          ✨ <strong>What happens now?</strong><br>
          Your account is registered with our high-speed AI responder. Any incoming direct messages will now receive instant, human-like consultative replies!
        </div>

        <a href="https://instagram.com" class="btn-test">Go Back to Instagram ➔</a>
      </div>
    </body>
    </html>
  `);
}
