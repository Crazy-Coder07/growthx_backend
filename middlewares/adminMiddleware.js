const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json({ message: 'Auth failed' });

        const verified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.adminId = verified.id;
        req.userRole = verified.role;
        if(req.userRole =="admin"){
            next();
        }else{
            res.status(401).json({ message: 'Invalid token' }); 
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = adminMiddleware;



