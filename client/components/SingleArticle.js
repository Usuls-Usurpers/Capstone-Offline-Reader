import React from "react";
import { fetchSingleArticle } from "../store/singleArticle";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: "",
    //   description: "",
    //   imageURL: "",
    //   prepTime: 0,
    //   quantity: 0,
    //   price: 0,
    //   country: "",
    // };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("id: ", id);
    this.props.loadSingleArticle(id);
  }

  handleClick() {
    const product = this.props.product;
    if (!this.props.isLoggedIn) {
      this.props.addGuestProduct(product);
    } else {
      this.props.addUserProduct(product);
    }
  }

  render() {
    const article = this.props.article || {};
    const { handleClick } = this;

    return (
      <div>
        Hello article!
        <div>{article.name}</div>
      </div>
      // <div id="single-article">
      //   <div id="image-container">
      //     <h3>{article.name}</h3>
      //   </div>
      //   <div id="product-info">
      //     <p>
      //       Prep Time:{" "}
      //       <strong>
      //         {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
      //       </strong>
      //     </p>
      //     <p>
      //       Price per kit: <strong>${product.price}.00</strong>
      //     </p>
      //     <p>{product.description}</p>
      //     <button onClick={() => handleClick()}>Mark as read</button>
      //   </div>
      // </div>
    );
  }
}

const mapState = (state) => {
  console.log("State in single article: ", state);
  return {
    article: state.singleArticle,
    //isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleArticle: (id) => dispatch(fetchSingleArticle(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleArticle);
