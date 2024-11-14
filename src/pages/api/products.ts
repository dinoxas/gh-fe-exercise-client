// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const getProducts = async () => {
	const result = await fetch('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/products');
	const json  = await result.json();
	return Response.json(json);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const result = await getProducts();

		if (!result.ok) {
			throw new Error('Failed to fetch data');
		}

		const json  = await result.json();

		res.status(200).json(json.slice(0, 30));
	  } catch (err) {
		res.status(500).json({ error: 'failed to load data' });
	  }
}
