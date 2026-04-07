export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const event = req.body;
  
  if (event.type === 'checkout.session.completed') {
    const email = event.data.object.customer_details?.email;
    if (email) {
      await fetch(`https://qdskbunparrhrptwndeb.supabase.co/rest/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SECRET_KEY,
          'Authorization': 'Bearer ' + process.env.SUPABASE_SECRET_KEY
        },
        body: JSON.stringify({ email: email.toLowerCase() })
      });
    }
  }
  res.status(200).json({ received: true });
}
