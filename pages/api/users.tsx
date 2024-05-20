
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';  
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase('dev');
  
  switch (req.method) {
    case 'GET': {
      if (!req.query.id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
    
      try {
        const id = new ObjectId(req.query.id as string);
        const user = await db.collection('users').findOne({ _id: id });
        if (user) {
          res.status(200).json({ user, isInDb: true });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Invalid User ID format' });
      }
      break;
    }
    
    case 'POST': {
      const newUser = {
        ...req.body,
        createdAt: new Date(),
      }
      const result = await db.collection('users').insertOne(newUser);
      console.log('User created with result:', result);
      res.status(201).json({insertedId: result.insertedId});
      break;
    }

    case 'PUT': {
      try {
        const id = new ObjectId(req.query.id as string);
        const updateResult = await db.collection('users').updateOne(
          { _id: id },
          { $set: req.body }
        );
        console.log('Update result:', updateResult);
        res.status(200).json({ matchedCount: updateResult.matchedCount, modifiedCount: updateResult.modifiedCount });
      } catch (error) {
        console.error('Error with ObjectId:', error);
        res.status(400).json({ message: 'Invalid User ID format' });
      }
      break;
    }

    case 'DELETE': {
      try {
        const id = new ObjectId(req.query.id as string);
        const deleteResult = await db.collection('users').deleteOne({ _id: id });
        console.log('Delete result:', deleteResult);
        res.status(200).json({ deletedCount: deleteResult.deletedCount });
      } catch (error) {
        console.error('Error with ObjectId:', error);
        res.status(400).json({ message: 'Invalid User ID format' });
      }
      break;
    }
  }
}

