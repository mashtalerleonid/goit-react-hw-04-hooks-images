import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    const query = this.state.query;
    const { notify, submit } = this.props;

    e.preventDefault();

    if (query === "") {
      notify("Enter something");
      return;
    }

    submit(query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        <ToastContainer />
      </header>
    );
  }
}

export default Searchbar;
