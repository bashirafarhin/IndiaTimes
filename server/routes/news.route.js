import express from "express";
import { getNdtvNews, getBbcNews, getHindustanTimesNews, getTimesNowNews, getNewYorkTimesNews } from "../controllers/news.controller.js";
import { authMiddleware} from '../middlewares/auth.middleware.js'

const newsRouter = express.Router();

newsRouter.get("/ndtvnews", authMiddleware, getNdtvNews);

newsRouter.get("/bbcnews", authMiddleware, getBbcNews);

newsRouter.get("/hindustantimesnews", authMiddleware, getHindustanTimesNews);

newsRouter.get("/timesnownews", authMiddleware, getTimesNowNews);

newsRouter.get("/newyorktimesnews", authMiddleware, getNewYorkTimesNews);

export default newsRouter;