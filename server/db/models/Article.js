class Article {
  constructor(id, article, url, title, addedAt, isComplete) {
    this.id = id;
    this.article = article;
    this.url = url;
    this.title = title;
    this.addedAt = addedAt;
    this.isComplete = isComplete;
  }
}

module.exports = Article;
