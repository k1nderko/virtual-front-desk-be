const db = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Session token is required' });
    }

    const session = await db.SessionToken.findOne({
      where: { token: token }
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid session token' });
    }

    req.session = session;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

module.exports = {
  authenticateToken
};
