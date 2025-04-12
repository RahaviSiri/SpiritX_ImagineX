
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


const authCoach = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        dotenv.config();
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

       
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.log(error)
        }
        
       
        
        req.body ={userId:decoded.id} ;
        

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token, authorization failed" });
    }
};

export default authCoach;
