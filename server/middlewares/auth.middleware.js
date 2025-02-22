import User from '../Database/Models/users.js';

export const authMiddleware = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    req.user = await User.findOne({userId : req.session.passport.user});
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};
