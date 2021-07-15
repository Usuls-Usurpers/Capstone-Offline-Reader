const puppeteer = require('puppeteer');

const wikipediaScraper = async (URL) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: 'networkidle2' });

  await page.waitForSelector('#content');

  const article = await page.evaluate(
    () => document.querySelector('#content').innerHTML
  );

  const title = await page.evaluate(
    () => document.querySelector('#firstHeading').innerHTML
  );

  const content = await page.evaluate(
    () => document.querySelector('#bodyContent').innerHTML
  );

  const cssSheet = await page.evaluate(
    () => document.querySelector('link[rel=stylesheet]').href
  );
  const date = new Date().toDateString();

  const data = {
    article: article,
    url: URL,
    title: title,
    addedAt: date,
    isComplete: false,
    cssSheet: cssSheet,
  };

  await browser.close();
  return data;
};

module.exports = wikipediaScraper;
