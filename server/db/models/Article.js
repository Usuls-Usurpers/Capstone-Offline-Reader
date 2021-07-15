class Article {
  constructor(
    id,
    article,
    url,
    title,
    addedAt,
    isComplete,
    cssSheet,
    cssStyle
  ) {
    this.id = id;
    this.article = article;
    this.url = url;
    this.title = title;
    this.addedAt = addedAt;
    this.isComplete = isComplete;
    this.cssSheet = cssSheet;
    this.cssStyle = cssStyle;
  }
}

module.exports = Article;
