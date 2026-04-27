// middleware/auth.middleware.js

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // fake validation
    if (token !== "12345") {
        return res.status(403).json({ message: "Invalid token" });
    }

    next();
};