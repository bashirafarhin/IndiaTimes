import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import User from "../Database/Models/users.js";
import env from "dotenv";
env.config();

export const logout = (req, res, next) => {
  if (!req.logout) {
    return res
      .status(500)
      .json({ message: "Logout function not found on the request object" });
  }
  req.logout((error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Logout failed", error: error.message });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      // res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  });
};

export const loginSuccess = async(req, res) => {
  return res
    .status(200)
    .json({ message: "Authentication Successfull", user : req.user });
};

export const loginFailure = (req, res) => {
  return res.status(401).json({ message: "Authentication failed" });
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error", error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Login failed", error: loginErr.message });
      }
      res.redirect(`${process.env.FRONTEND_URL}/home/ndtvnews`);
    });
  })(req, res, next);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ userId: profile.id });
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            userId: profile.id,
            subscription: false,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userId); // stores userId in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    done(null, { userId: id }); // Attach only userId to req.user
  } catch (error) {
    done(error, null);
  }
});
