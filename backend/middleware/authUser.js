import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

        // Extract the token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token, authorization failed" });
    }
};

export default authUser;