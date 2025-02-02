import express from 'express';
import multer from 'multer';
import { join } from 'path';
import Image from '../models/Image.js';

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

const upload = multer({ storage: storage });

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.findAll();
    // Ensure we're sending an empty array if no images found
    res.json(images || []);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ 
      message: 'Error fetching images',
      error: error.message 
    });
  }
});

// Upload a new image
router.post('/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { title, description, price, category } = req.body;
    const filename = req.file.filename;

    const image = await Image.create({
      title: title || 'Untitled',
      description: description || '',
      filename,
      price: parseFloat(price) || 0,
      category: category || 'Uncategorized'
    });

    res.status(201).json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(400).json({ 
      message: 'Error uploading image',
      error: error.message 
    });
  }
});

// Simulate purchase
router.post('/purchase', async (req, res) => {
  try {
    const { imageIds } = req.body;
    if (!imageIds || !Array.isArray(imageIds)) {
      return res.status(400).json({ message: 'Invalid image IDs provided' });
    }

    const images = await Image.findAll({
      where: {
        id: imageIds
      }
    });
    
    const total = images.reduce((sum, img) => sum + img.price, 0);
    
    res.json({
      success: true,
      message: 'Purchase simulated successfully',
      total,
      items: images
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