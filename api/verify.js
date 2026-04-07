export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ paid: false });

  const response = await fetch(
    `https://qdskbunparrhrptwndeb.supabase.co/rest/v1/payments?email=eq.${encodeURIComponent(email.toLowerCase())}&select=email`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SECRET_KEY,
        'Authorization': 'Bearer ' + process.env.SUPABASE_SECRET_KEY
      }
    }
  );
  const data = await response.json();
  res.status(200).json({ paid: data.length > 0 });
}
