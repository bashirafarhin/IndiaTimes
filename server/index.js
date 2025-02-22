import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

//routes
import authRouter from "./routes/auth.route.js";
import paymentRouter from "./routes/payment.route.js";
import userRouter from "./routes/user.route.js";
import newsRouter from "./routes/news.route.js";

//connection and setUp
import connectToDB from "./Database/connection.js";
connectToDB();

env.config();
const app = express();
const port = process.env.PORT || 3000;
const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: process.env.DATABASE_NAME,
      collectionName: process.env.COLLECTION_NAME,
      ttl: 60 * 60 * 1,
      autoRemove: 'interval',
      autoRemoveInterval: 10
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOption));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting up routes
app.use("/", userRouter);
app.use("/news", newsRouter)
app.use("/auth", authRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
