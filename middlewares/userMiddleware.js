const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json({ message: 'Auth failed' });

        const verified = jwt.verify(token, process.env.USER_JWT_SECRET);
        req.userId = verified.id;
        req.userRole = verified.role;
        if(req.userRole =="student"){
            next();
        }else{
            res.status(401).json({ message: 'Invalid token err' }); 
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token cth' });
    }
};

module.exports = userMiddleware;
