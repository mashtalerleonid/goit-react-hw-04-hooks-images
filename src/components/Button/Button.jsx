import { Component } from "react";

class Button extends Component {
  componentDidMount() {
    if (this.props.page === 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  render() {
    return (
      <button className="Button" type="button" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
