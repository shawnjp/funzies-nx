import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase('dev');

  switch (req.method) {
    case 'POST': {
      // Directly create a media record from request body for testing
      const mediaData = {
        filename: req.body.filename,
        path: req.body.path,
        uploadDate: new Date(),
        mediaType: req.body.mediaType,
        metadata: {
          title: req.body.title || 'Unknown Title',
          artist: req.body.artist || 'Unknown Artist',
          album: req.body.album || 'Unknown Album',
          duration: parseInt(req.body.duration) || 0
        }
      };

      const result = await db.collection('media').insertOne(mediaData);
      res.status(201).json({ insertedId: result.insertedId, mediaData });
      break;
    }
    case 'GET': {
      // Retrieve all media records for testing
      const mediaRecords = await db.collection('media').find({}).toArray();
      res.status(200).json(mediaRecords);
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}