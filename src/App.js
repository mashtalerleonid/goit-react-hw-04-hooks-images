import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages } from "./services/images-api";
import Loader from "components/Loader";
import Button from "components/Button";

class App extends Component {
  state = {
    selectedImageUrl: null,
    query: "",
    page: 1,
    status: "idle",
    totalHits: 0,
    images: [],
    error: null,
  };

  closeModal = (e) => {
    this.setState({ selectedImageUrl: null });
  };

  handleSubmit = (query) => {
    this.setState({ query, page: 1 });
  };

  handleSelectImage = (imageUrl) => {
    this.setState({ selectedImageUrl: imageUrl });
  };

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  makeNotification = (text) => {
    toast(text, {
      autoClose: 2500,
      type: "info",
      theme: "colored",
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.images;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const nextQuery = this.state.query;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: "pending" });

      fetchImages(nextPage, nextQuery)
        .then((response) => {
          const { totalHits, hits } = response;

          if (nextPage === 1) {
            this.setState({
              images: [...hits],
              status: "resolved",
              totalHits,
            });
          } else {
            this.setState({
              images: [...prevImages, ...hits],
              status: "resolved",
              totalHits,
            });
          }

          if (totalHits === 0) {
            this.makeNotification("No results");
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { selectedImageUrl, page, status, totalHits, error } = this.state;
    const maxPage = Math.ceil(totalHits / 12);

    return (
      <div>
        <Searchbar submit={this.handleSubmit} notify={this.makeNotification} />

        <ImageGallery
          onSelect={this.handleSelectImage}
          images={this.state.images}
        />

        {status === "pending" && <Loader />}

        {status === "resolved" && page < maxPage && (
          <Button page={page} onClick={this.incrementPage} />
        )}

        {status === "rejected" && <h1>{error.message}</h1>}

        {selectedImageUrl && (
          <Modal handleClose={this.closeModal}>
            <img src={selectedImageUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
