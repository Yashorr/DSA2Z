import { db } from "../libs/db.js";

export const checkTokens = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.tokens <= 0) {
        return res.status(403).json({ message: "Insufficient tokens" });
    }

    next();
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error while checking AI tokens" });
    
  }

  
};