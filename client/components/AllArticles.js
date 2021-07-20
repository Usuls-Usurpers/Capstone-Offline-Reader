import React from "react";
import { connect } from "react-redux";
import { fetchArticles, deleteArticleThunk } from "../store/articles";
import { setArticle } from "../store/singleArticle";

class AllArticles extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.fetchArticles(this.props.userId);
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      await this.props.fetchArticles(this.props.userId);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setArticle(this.props.articles[event.target.value]);
    this.props.history.push("/articles/view-article");
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.deleteArticle([
      this.props.userId,
      this.props.articles[event.target.value].id,
    ]);
    this.props.history.push("/articles");
  }

  render() {
    const { articles } = this.props || [];
    return (
      <div>
        {this.props.isLoggedIn && articles.length > 0 ? (
          <div className="all-articles">
            {articles.map((article, index) => {
              return (
                <div key={article.id} className="article-items">
                  <h3>{article.title}</h3>
                  <img src={article.displayImage} />
                  <div id="buttons-allArticles">
                    <button value={index} onClick={this.handleSubmit}>
                      View Article
                    </button>
                    <br />
                    <button value={index} onClick={this.handleDelete}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 id="message-allArticles">
            Navigate to our home page to add an article!
          </h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    articles: state.articles,
    isLoggedIn: !!state.auth.uid,
    userId: state.auth.uid,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchArticles: (infoObj) => dispatch(fetchArticles(infoObj)),
    setArticle: (article) => dispatch(setArticle(article)),
    deleteArticle: (infoObj) => dispatch(deleteArticleThunk(infoObj)),
  };
};

export default connect(mapState, mapDispatch)(AllArticles);
