const mongoose = require('mongoose');
const Event = require('./Models/Event'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:4000/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixImagePaths = async () => {
  try {
    const events = await Event.find();
    
    for (const event of events) {
      if (event.image.includes('\\')) {
        // Replace backslashes with forward slashes
        event.image = event.image.replace(/\\/g, '/');
        await event.save();
      }
    }
    
    console.log('Image paths updated successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating image paths:', error);
    mongoose.disconnect();
  }
};

fixImagePaths();
