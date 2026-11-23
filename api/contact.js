export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'noorulain.hameed.ai@uajk.edu.pk',
        subject: `New Message from ${name}`,
        reply_to: email,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(400).json(data);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Email send nahi ho saki' });
  }
}
