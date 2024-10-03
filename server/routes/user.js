import express from "express";
import env from "dotenv";
import puppeteer from "puppeteer";

//models
import User from "../Database/Models/users.js";
import Feedback from "../Database/Models/feedback.js";
env.config();

const userRouter = express.Router();

userRouter.get("/:id/ndtvnews", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });

    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH // Use the path set in the Dockerfile
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.goto("https://www.ndtv.com/");
    const headings = await page.evaluate(() => {
      let headings = document.querySelectorAll(".vjl2_cn .crd_ttl8");
      return Array.from(headings)
        .slice(0, 50)
        .map((element) => ({
          text: element.textContent.trim(),
          href: element.getAttribute("href"),
        }));
    });

    await browser.close();
    const result = user.subscription ? headings : headings.slice(0, 10);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

userRouter.get("/:id/bbcnews", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/news");
    const newsData = await page.evaluate(() => {
      const cardWrappers = document.querySelectorAll(
        '[data-testid="card-text-wrapper"]'
      );
      const data = Array.from(cardWrappers).map((card) => {
        const headlineElement = card.querySelector(
          '[data-testid="card-headline"]'
        );
        const descriptionElement = card.querySelector(
          '[data-testid="card-description"]'
        );
        return {
          text: headlineElement
            ? headlineElement.textContent.trim()
            : "No headline",
          description: descriptionElement
            ? descriptionElement.textContent.trim()
            : "No description",
        };
      });
      return data;
    });
    await browser.close();
    const result = user.subscription ? newsData.slice(0, 50) : newsData.slice(0, 10);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

userRouter.get("/:id/hindustantimesnews", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.hindustantimes.com/");
    const headings = await page.evaluate(() => {
      let headings = document.querySelectorAll(".hdg3");
      return Array.from(headings)
        .slice(0, 50)
        .map((element) => ({
          text: element.textContent.trim(),
          href: `https://www.hindustantimes.com/${element
            .querySelector("a")
            .getAttribute("href")}`,
        }));
    });
    await browser.close();
    const result = user.subscription ? headings : headings.slice(0, 10);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

userRouter.get("/:id/timesnownews", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.timesnownews.com/");
    const headings = await page.evaluate(() => {
      let headings = document.querySelectorAll("._2LXp > div > a");
      return Array.from(headings).map((element) => ({
        text: element.getAttribute("title") || "No title",
        href: element.getAttribute("href") || "No link",
      }));
    });
    await browser.close();
    const result = user.subscription ? headings : headings.slice(0, 10);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

userRouter.get("/:id/newyorktimesnews", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.nytimes.com/international/");
    const headings = await page.evaluate(() => {
      const sections = document.querySelectorAll(".story-wrapper");
      const result = Array.from(sections).map((section) => {
        const href = section.querySelector("a.css-9mylee")?.href || null;
        const pTags = section.querySelectorAll("p");
        const pTexts = Array.from(pTags).map((p) => p.innerText);
        return {
          text: pTexts[0],
          description: pTexts[1],
          href: href,
        };
      });
      return result;
    });
    await browser.close();
    let result = headings.slice(0, 50);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

userRouter.post("/:id/feedback", async (req, res) => {
  try {
    const id = req.params.id;
    const { feedback } = req.body;
    let user = await Feedback.findOne({ userId: id });
    if (!user) {
      user = new Feedback({
        userId: id,
        feedback: [feedback],
      });
    } else {
      user.feedback.push(feedback);
    }
    await user.save();
    res.status(200).json({ message: "Feedback added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    let user = await User.findOneAndUpdate({ userId: id }, updatedFields, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.findOne({ userId: id });
    return res.status(200).json({
      name: user.name,
      email: user.email,
      id: user.userId,
      subscription: user.subscription,
    });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

userRouter.get("/:id/subscription", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });
    return res.status(200).json({ subscription: user.subscription });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});
export default userRouter;
