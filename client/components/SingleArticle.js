import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

class SingleArticle extends React.Component {
  componentDidMount() {
    console.log('this.props in Single Article: ', this.props);
  }

  render() {
    const article = this.props.article || {};
    console.log('PROPS>>>', this.props);
    return (
      <div>
        <link rel="stylesheet" type="text/css" href={article.cssSheet} />
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
