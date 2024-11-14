export default function handler(req, res) {
  if (req.method === 'POST') {
	const data = req.body;
	res.status(200).json({ message: 'Data received', data });
  } else {
	  res.setHeader('Allow', ['POST']);
	  res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}