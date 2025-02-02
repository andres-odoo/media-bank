import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sequelize, Media } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerExistingFiles = async () => {
  try {
    // First ensure database connection
    await sequelize.authenticate();
    console.log('Database connection established.');
    
    // Sync models
    await sequelize.sync();
    console.log('Models synchronized.');

    // Read all files in the uploads directory
    const files = await readdir(join(__dirname, '../uploads'));
    
    for (const filename of files) {
      // Skip hidden files
      if (filename.startsWith('.')) continue;
      
      // Determine type based on filename
      const type = filename.toLowerCase().endsWith('.mp4') ? 'video' : 'image';
      
      // Check if file is already registered
      const existing = await Media.findOne({ where: { filename } });
      
      if (!existing) {
        // Create new media entry
        await Media.create({
          title: filename,
          description: 'Auto-registered media file',
          filename,
          type,
          price: 0,
          category: 'Auto-registered'
        });
        console.log(`Registered: ${filename}`);
      } else {
        console.log(`Already exists: ${filename}`);
      }
    }
    
    console.log('Registration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error registering files:', error);
    process.exit(1);
  }
};

// Run the registration
registerExistingFiles();