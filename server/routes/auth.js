import express from "express";
import passport from "passport";
import env from "dotenv";
env.config();

const router = express.Router();

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.redirect(process.env.FRONTEND_URL);
    });
  });
});

router.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    req.session.userId = req.user.userId;
    res.status(200).json({ authenticated: true, userId: req.user.userId });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

router.get("/login/failure", (req, res) => {
  res.status(401).json({ authenticated: false });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.redirect("/auth/login/failure");
    }
    if (!user) {
      return res.redirect("/auth/login/failure");
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect("/auth/login/failure");
      }
      res.redirect(`${process.env.FRONTEND_URL}/`);
    });
  })(req, res, next);
});

export default router;
