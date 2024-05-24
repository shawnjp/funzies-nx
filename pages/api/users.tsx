
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';  
import { ObjectId } from 'mongodb';

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase('dev');
  
  switch (req.method) {
    case 'GET': {
      const { id, clerkId } = req.query;

      if (!id && !clerkId) {
        res.status(400).json({ message: 'User ID or Clerk ID is required' });
        return;
      }

      try {
        if (id && !isValidObjectId(id as string)) {
          throw new Error('Invalid User ID format');
        }
        const query = id ? { _id: new ObjectId(id as string) } : { clerkId: clerkId as string };
        const user = await db.collection('users').findOne(query);
        
        if (user) {
          res.status(200).json({ user, isInDb: true });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(400).json({ message: (error as Error).message });
      }
      break;
    }
    
    case 'POST': {
      const newUser = {
        ...req.body,
        isAdmin: false,
        createdAt: new Date(),
      }
      const result = await db.collection('users').insertOne(newUser);
      res.status(201).json({insertedId: result.insertedId});
      break;
    }

    case 'PUT': {
      const { id } = req.query;
      if (!id || !isValidObjectId(id as string)) {
        res.status(400).json({ message: 'Invalid User ID format' });
        return;
      }
      try {
        const updateResult = await db.collection('users').updateOne(
          { _id: new ObjectId(id as string) },
          { $set: req.body }
        );
        res.status(200).json({ matchedCount: updateResult.matchedCount, modifiedCount: updateResult.modifiedCount });
      } catch (error) {
        console.error('Error with ObjectId:', error);
        res.status(400).json({ message: 'Invalid User ID format' });
      }
      break;
    }

    case 'DELETE': {
      const { id } = req.query;
      if (!id || !isValidObjectId(id as string)) {
        res.status(400).json({ message: 'Invalid User ID format' });
        return;
      }
      try {
        const deleteResult = await db.collection('users').deleteOne({ _id: new ObjectId(id as string) });
        res.status(200).json({ deletedCount: deleteResult.deletedCount });
      } catch (error) {
        console.error('Error with ObjectId:', error);
        res.status(400).json({ message: 'Invalid User ID format' });
      }
      break;
    }
  }
}

