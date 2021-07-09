const puppeteer = require('puppeteer');

const mediumScraper = async (URL) => {
  // { headless: false, devtools: true }
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: 'networkidle2' });

  await page.waitForSelector('article');

  const article = await page.evaluate(
    () => document.querySelector('article').innerHTML
  );
  const title = await page.evaluate(
    () =>
      // document.querySelector('h1.fm.dk.fn.ba.cz.fo.fp.fq.fr.fs').innerHTML
      // document.querySelector('title').innerHTML
      document.querySelector('div h1').innerHTML
  );
  const date = new Date().toDateString();
  const data = {
    article: article,
    url: URL,
    title: title,
    addedAt: date,
    isComplete: false,
  };
  await browser.close();
  return data;
};

module.exports = mediumScraper;
