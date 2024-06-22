import jwt from 'jsonwebtoken';
import hash from "../configuration/jwtConfig.js";

export function authenticationToken(req,res,next){
    const authHeader = req.header("Authorization");
    if (!authHeader){
        return res.status(201).json({message: "Unauthorized: Missing token!"})
    }
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token){
        return res.status(201).json({message: "Unauthorized: Invalid token!"})
    }
    jwt.verify(token, hash, (err,user)=>{
        if (err){
            return res.status(403).json({message: "Forbidden: Invalid token!"})
        }
        req.user = user;
        next();
    })
}

export function verifyToken(token){
    return jwt.verify(token,hash)
}