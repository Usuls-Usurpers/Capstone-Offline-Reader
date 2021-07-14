import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
//import { Link } from "react-router-dom";

class SingleArticle extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.handleClick = this.handleClick.bind(this);
  // }

  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   console.log("id: ", id);
  //   this.props.loadSingleArticle(id);
  // }

  render() {
    const article = this.props.article || {};

    return (
      <div>
        Hello article!
        <div>{ReactHtmlParser(article.article)}</div>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log('State in single article: ', state);
  return {
    article: state.article,
    //isLoggedIn: !!state.auth.id,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     loadSingleArticle: (id) => dispatch(fetchSingleArticle(id)),
//   };
// };

export default connect(mapState)(SingleArticle);
