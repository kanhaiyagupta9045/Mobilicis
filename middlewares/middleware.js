const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorisation
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
}