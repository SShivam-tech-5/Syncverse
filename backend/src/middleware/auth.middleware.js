import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export const verifyToken = (req, res, next) => {
    const token = req.query.token || req.body.token;

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
