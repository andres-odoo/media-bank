import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { Media } from '../models/index.js';

const router = express.Router();

// Get user's media
router.get('/media', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const media = await Media.findAll({
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(media);
  } catch (error) {
    console.error('Error fetching user media:', error);
    res.status(500).json({ error: 'Error fetching user media' });
  }
});

// Update media
router.put('/media/:id', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { id } = req.params;
  const { title, price } = req.body;

  try {
    const media = await Media.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found or unauthorized' });
    }

    await media.update({
      title,
      price
    });

    res.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({ error: 'Error updating media' });
  }
});

// Delete media
router.delete('/media/:id', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { id } = req.params;

  try {
    const media = await Media.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found or unauthorized' });
    }

    await media.destroy();
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Error deleting media' });
  }
});

export default router;