import React from "react";
import { connect } from "react-redux";
import { fetchArticles } from "../store/articles";
import { setArticle } from "../store/singleArticle";


class AllArticles extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handle Submit was clicked!");
    // look into this. Why a string?
    this.props.setArticle(event.target.value);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchArticles();
    }
  }

  render() {
    return (
      <div>
        {this.props.articles.length ? (
          <ul className="listAll">
            {this.props.articles.map((article) => {
              return (
                <li key={article.id} className="article-items">
                  <h3>{article.title}</h3>
                  <button value={article} onClick={this.handleSubmit}>
                    View Article
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    articles: state.articles,
    isLoggedIn: !!state.auth.uid,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchArticles: () => dispatch(fetchArticles()),
    setArticle: (article) => dispatch(setArticle(article)),
  };
};

export default connect(mapState, mapDispatch)(AllArticles);
