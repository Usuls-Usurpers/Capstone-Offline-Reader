import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

class SingleArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      stylingElem: [],
    };
  }

  componentDidMount() {
    console.log("this.props in Single Article: ", this.props);
    const topNav = document.getElementById("mw-navigation");
    const sideNav = document.getElementById("mw-page-base");

    if (topNav || sideNav) {
      topNav.remove();
      sideNav.remove();
    }
    if (this.props.article.cssSheet.length) {
      this.props.article.cssSheet.forEach((link) => {
        let indLink = document.createElement("link");
        indLink.href = link;
        indLink.rel = "stylesheet";
        document.head.appendChild(indLink);
        this.state.stylingElem.push(indLink);
      });
    }
    if (this.props.article.cssStyle.length) {
      this.props.article.cssStyle.forEach((style) => {
        let indStyle = document.createElement("style");
        indStyle.innerText = style;
        document.head.append(indStyle);
        this.state.stylingElem.push(indStyle);
      });
    }
  }

  componentWillUnmount() {
    this.state.stylingElem.forEach((tag) => tag.remove());
  }

  render() {
    const article = this.props.article || {};
    return (
      <div>
        <div id="link-to-original">
          <a href={article.url}>Visit Original</a>
        </div>
        <div>
          <div>{ReactHtmlParser(article.article)}</div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("State in single article: ", state);
  return {
    article: state.article,
  };
};

export default connect(mapState)(SingleArticle);
