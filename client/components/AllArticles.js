import React from "react";
import { connect } from "react-redux";
import articlesReducer, { fetchArticles } from "../store/articles"

class AllArticles extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    return (
      <div>
        {this.props.articles.length ? (
          <ul className="listAll">
            {this.props.articles.map((article) => {
              return (
                <li key={article.id} className="listItem">
                  <h3>
                    {article.title}
                  </h3>
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
  };
};

export default connect(mapState, mapDispatch)(AllArticles);
