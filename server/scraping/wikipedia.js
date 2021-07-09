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

  const date = new Date().toDateString();

  const data = {
    content: content,
    url: URL,
    title: title,
    addedAt: date,
    isComplete: false,
  };

  console.log('data>>>>>', data);
  await browser.close();
  return data;
  // return article;
};

module.exports = wikipediaScraper;
