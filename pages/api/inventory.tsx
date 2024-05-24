import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import multer from 'multer';
// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  }
interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File; // Use Express.Multer.File instead of File
}
const storage = multer.diskStorage({  
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
  
  const upload = multer({ storage: storage });

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase('dev');
    if (!db) {
      console.error('Failed to connect to database');
      return res.status(500).json({ error: 'Database connection failed' });
    }
    const collection = db.collection('inventory');
    if (!collection) {
      console.error('Failed to retrieve collection');
      return res.status(500).json({ error: 'Collection not found' });
    }

    if (req.method === 'POST') {
        return upload.single('file')(req as any, res as any, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            postHandler(req, res, collection);
        });
    }

    switch (req.method) {
case 'GET':
    const items = await collection.find({}).toArray();
    const sanitizedItems = items.map(item => ({
        ...item,
        attachment: item.attachment || { // Provide default values if attachment is null
            path: '/path/to/default/image.png', // Default image path
            originalName: 'default-image.png',
            mimeType: 'image/png',
            size: 0
        },
        title: item.title || 'No Title', // Default title
        description: item.description || 'No description available.', // Default description
        price: item.price || 0, // Default price
        stock: item.stock || 0 // Default stock
    }));
    res.status(200).json(sanitizedItems);
    break;
        case 'PUT':
            const { id, ...updateData } = req.body;
            if (!isValidObjectId(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }
            const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
            res.status(200).json(updateResult);
            break;
        case 'DELETE':
            const { id: deleteId } = req.body;
            if (!isValidObjectId(deleteId)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }
            const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) });
            res.status(200).json(deleteResult);
            break;
        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Separate function to handle POST logic
async function postHandler(req: NextApiRequestWithFile, res: NextApiResponse, collection: any) {
  const { title, description, price, stock } = req.body;
  const attachment = {
    path: req.file?.path, // Path where the file is saved
    originalName: req.file?.originalname, // Original name of the file
    mimeType: req.file?.mimetype, // MIME type of the file
    size: req.file?.size // Size of the file in bytes
  };
  const result = await collection.insertOne({ title, description, price, attachment, stock });
  console.log(attachment)
  res.status(201).json(result);
}