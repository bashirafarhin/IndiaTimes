import puppeteer from "puppeteer";

export const getNdtvNews = async (req, res) => {
    try {
      const user = req.user;
      const browser = await puppeteer.launch();
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
      res.status(500).json({ error: error.message });
    }
  }

export const getBbcNews = async (req, res) => {
    try {
      const user = req.user;
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
      res.status(500).json({ error: error.message });
    }
  }

export const getHindustanTimesNews = async (req, res) => {
    try {
      const user = req.user;
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
      res.status(500).json({ error: error.message });
    }
  }

export const getTimesNowNews = async (req, res) => {
    try {
      const user = req.user;
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
      res.status(500).json({ error: error.message });
    }
  }

export const getNewYorkTimesNews = async (req, res) => {
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
      res.status(500).json({ error: error.message });
    }
  }