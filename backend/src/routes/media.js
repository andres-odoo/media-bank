import express from 'express';
import multer from 'multer';
import { join } from 'path';
import { Media } from '../models/index.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter to accept only images and videos
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

// Get all media
router.get('/media', async (req, res) => {
  try {
    const media = await Media.findAll();
    res.json(media || []);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ 
      message: 'Error fetching media',
      error: error.message 
    });
  }
});

// Upload new media
router.post('/media', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const { title, description, price, category } = req.body;
    const filename = req.file.filename;
    const type = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

    const media = await Media.create({
      title: title || 'Untitled',
      description: description || '',
      filename,
      type,
      price: parseFloat(price) || 0,
      category: category || 'Uncategorized'
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(400).json({ 
      message: 'Error uploading media',
      error: error.message 
    });
  }
});

// Simulate purchase
router.post('/purchase', async (req, res) => {
  try {
    const { mediaIds } = req.body;
    if (!mediaIds || !Array.isArray(mediaIds)) {
      return res.status(400).json({ message: 'Invalid media IDs provided' });
    }

    const mediaItems = await Media.findAll({
      where: {
        id: mediaIds
      }
    });
    
    const total = mediaItems.reduce((sum, item) => sum + item.price, 0);
    
    res.json({
      success: true,
      message: 'Purchase simulated successfully',
      total,
      items: mediaItems
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(400).json({ 
      message: 'Error processing purchase',
      error: error.message 
    });
  }
});

export default router;