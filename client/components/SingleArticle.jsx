import React from "react";
import { fetchSingleArticle } from "../store/singleArticle";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageURL: "",
      prepTime: 0,
      quantity: 0,
      price: 0,
      country: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleProduct(id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.editProduct({
      ...this.state,
      id: this.props.product.id,
    });
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
    const product = this.props.product || {};
    const { handleClick } = this;

    return (
      <div id="single-article">
        <div id="image-container">
          <h3>{product.name}</h3>
          <img width={602} height={339} src={product.imageURL} />
        </div>
        <div id="product-info">
          <p>
            Prep Time:{" "}
            <strong>
              {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
            </strong>
          </p>
          <p>
            Price per kit: <strong>${product.price}.00</strong>
          </p>
          <p>{product.description}</p>
          <button onClick={() => handleClick()}>Mark as read</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    article: state.singleArticle,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleArticle: (id) => dispatch(fetchSingleArticle(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
