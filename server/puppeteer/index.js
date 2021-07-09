const mediumScraper = require('./medium');
const nytimesScraper = require('./nytimes');
const wikipediaScraper = require('./wikipedia');

const scraperObj = {
  medium: mediumScraper,
  nytimes: nytimesScraper,
  wikipedia: wikipediaScraper,
};

module.exports = scraperObj;
