import express from 'express';
import multer from 'multer';
import { Op } from 'sequelize';
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

// Get all media with filtering
router.get('/media', async (req, res) => {
  try {
    const { q, type } = req.query;
    let whereClause = {};

    // Add search query filter
    if (q) {
      whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
          { category: { [Op.like]: `%${q}%` } }
        ]
      };
    }

    // Add type filter
    if (type && type !== 'all') {
      whereClause.type = type;
    }

    const media = await Media.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

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

export default router;