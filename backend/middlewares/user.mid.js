import jwt from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
    
    // Ensure the decoded payload has the required `id`
    if (!decoded.id) {
      return res.status(400).json({ errors: "Invalid token payload" });
    }

    // Attach the user ID to the request object
    req.userId = decoded.id;

    console.log("Decoded token:", decoded);

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("Error in user middleware:", error);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default userMiddleware;
