const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const MESSAGES_DATA_PATH = path.join(__dirname, '../data/messages.json');

// Initialize messages data file if it doesn't exist
const initializeMessagesData = async () => {
  try {
    await fs.access(MESSAGES_DATA_PATH);
  } catch (error) {
    await fs.mkdir(path.dirname(MESSAGES_DATA_PATH), { recursive: true });
    await fs.writeFile(MESSAGES_DATA_PATH, JSON.stringify([], null, 2));
  }
};

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }
    
    await initializeMessagesData();
    
    // Read existing messages
    const data = await fs.readFile(MESSAGES_DATA_PATH, 'utf8');
    const messages = JSON.parse(data);
    
    // Create new message
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'No Subject',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add to messages array
    messages.push(newMessage);
    
    // Save back to file
    await fs.writeFile(MESSAGES_DATA_PATH, JSON.stringify(messages, null, 2));
    
    // TODO: Implement email sending with nodemailer here
    // For now, we'll just store the message
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: newMessage.id
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: 'Please try again later or contact me directly via email'
    });
  }
});

// GET /api/contact/messages - Get all messages (for admin use)
router.get('/messages', async (req, res) => {
  try {
    await initializeMessagesData();
    const data = await fs.readFile(MESSAGES_DATA_PATH, 'utf8');
    const messages = JSON.parse(data);
    
    // Sort by timestamp (newest first)
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// PUT /api/contact/messages/:id/read - Mark message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    
    await initializeMessagesData();
    const data = await fs.readFile(MESSAGES_DATA_PATH, 'utf8');
    const messages = JSON.parse(data);
    
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    messages[messageIndex].read = true;
    await fs.writeFile(MESSAGES_DATA_PATH, JSON.stringify(messages, null, 2));
    
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

module.exports = router;