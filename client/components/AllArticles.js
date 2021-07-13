import React from "react";
import { connect } from "react-redux";
import { fetchArticles } from "../store/articles";
import { setArticle } from "../store/singleArticle";

class AllArticles extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
        console.log('articles component userid', this.props.userId)
        await this.props.fetchArticles(this.props.userId);
    } catch (err) {
        console.log(err)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handle Submit was clicked!");
    // look into this. Why a string?
    this.props.setArticle(event.target.value);
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
        <div>
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
          </div>
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
    userId: state.auth.uid,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchArticles: (infoObj) => dispatch(fetchArticles(infoObj)),
    setArticle: (article) => dispatch(setArticle(article)),
  };
};

export default connect(mapState, mapDispatch)(AllArticles);
