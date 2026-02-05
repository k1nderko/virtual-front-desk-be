const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const generateSessionToken = async (req, res) => {
  try {
    const token = uuidv4();
    
    const sessionToken = await db.SessionToken.create({
      token: token
    });

    res.json({ token: sessionToken.token });
  } catch (error) {
    console.error('Error generating session token:', error);
    res.status(500).json({ error: 'Failed to generate session token' });
  }
};

module.exports = {
  generateSessionToken
};
