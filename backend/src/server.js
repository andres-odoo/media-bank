import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mediaRoutes from './routes/media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Static files
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Media Bank API' });
});

// Routes
app.use('/api', mediaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something broke!',
    error: err.message 
  });
});

// Start server
const startServer = async () => {
  try {
    // Import and initialize database
    const { sequelize } = await import('./models/index.js');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync models without force
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();