const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access Denied' });
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Denied' });
    }
    next();
};

exports.verifyCityAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' || req.user.city !== req.params.city) {
        return res.status(403).json({ error: 'Access Denied for this city' });
    }
    next();
};