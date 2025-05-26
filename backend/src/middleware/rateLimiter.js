import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my_limit_key");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.log("Error in rateLimiter middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
    
    next(error);
  }
};

export default rateLimiter;
