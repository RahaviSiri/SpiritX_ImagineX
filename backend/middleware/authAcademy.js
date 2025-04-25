import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


const authAcademy = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        dotenv.config();
        console.log(authHeader)
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

       
        const token = authHeader.split(" ")[1];
        console.log(token)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
        } catch (error) {
            console.log(error)
        }
        req.body ={academyID:decoded.id} ;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token, authorization failed" });
    }
};

export default authAcademy;
