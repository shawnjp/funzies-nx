import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('dev'); // Replace with your database name

      const { name, email, message } = req.body;

      // Insert the form data into the collection
      const result = await db.collection('contactForms').insertOne({
        name,
        email,
        message,
        createdAt: new Date(),
      });

      res.status(200).json({ success: true, message: 'Form submitted successfully', data: result });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}