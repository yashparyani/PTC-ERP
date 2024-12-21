
// auth, isStudent,isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token missing or invalid',
            });
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Add user details to request
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
    }
};


exports.isAdmin = (req,res,next) => {
    try{
            if(req.user.role !== "Admin") {
                return res.status(401).json({
                    success:false,
                    message:'This is a protected route for students',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}
