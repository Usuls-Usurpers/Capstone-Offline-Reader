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
    console.log(event.target.value)
    console.dir(this.props.articles[event.target.value])
    this.props.setArticle(this.props.articles[event.target.value]);
    this.props.history.push("/articles/view-article")
  }

  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    return (
      <div>
        {this.props.articles.length ? (
          <ul className="listAll">
            {this.props.articles.map((article, index) => {
              return (
                <li key={article.id} className="article-items">
                  <h3>{article.title}</h3>
                  <button value={index} onClick={this.handleSubmit}>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchArticles: () => dispatch(fetchArticles()),
    setArticle: (article) => dispatch(setArticle(article)),
  };
};

export default connect(mapState, mapDispatch)(AllArticles);
