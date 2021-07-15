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
    () => document.querySelector('div h1').innerHTML
  );

  const cssSheet = await page.evaluate(() => {
    const nodeList = Array.from(
      document.querySelectorAll('head > link[rel="stylesheet"]')
    );
    const links = nodeList.map((node) => {
      return node.href;
    });
    return links;
  });

  console.log('cssSheet>>>>>', cssSheet);

  const cssStyle = await page.evaluate(() => {
    const nodeList = Array.from(document.querySelectorAll('style'));
    const styles = nodeList.map((node) => node.innerHTML);
    return styles;
  });

  const date = new Date().toDateString();

  const data = {
    article: article,
    url: URL,
    title: title,
    addedAt: date,
    isComplete: false,
    cssSheet: cssSheet,
    cssStyle: cssStyle,
  };
  await browser.close();
  return data;
};

module.exports = mediumScraper;
