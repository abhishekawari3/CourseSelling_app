const JWT = require('jsonwebtoken')

function authAdmin(req,res,next){
    const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).json({
                message: "token missing",
            })
        }
        const token = authHeader.split(" ")[1];
        
        try{
            const decoded = JWT.verify(token, process.env.JWT_SECRET_ADMIN);
            req.userId = decoded.userId;
            req.username = decoded.username;
    
            next();
        } catch(err){
            return res.status(401).json({
                message: "invalid token",
                error: err.message
            })
        }
}

module.exports = authAdmin;