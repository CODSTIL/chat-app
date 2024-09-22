import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Assuming your JWT payload contains a 'userId' field
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach user to the request object
		req.user = user;

		next();
	} catch (error) {
		console.error("Error in protectRoute middleware:", error);

		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ error: "Unauthorized - Token Expired" });
		} else if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
