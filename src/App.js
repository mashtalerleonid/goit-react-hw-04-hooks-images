import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { fetchImages } from "./services/images-api";
import { toast, ToastContainer } from "react-toastify";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "components/Loader";
import Button from "components/Button";
import Modal from "./components/Modal";

export default function App() {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(0);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus("pending");

    fetchImages(page, query)
      .then((response) => {
        const { totalHits, hits } = response;

        if (page === 1) {
          setImages([...hits]);
        } else {
          setImages((prev) => [...prev, ...hits]);
        }

        setTotalHits(totalHits);
        setStatus("resolved");

        if (totalHits === 0) {
          makeNotification("No results");
        }
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [query, page]);

  const closeModal = (e) => {
    setSelectedImageUrl(null);
  };

  const handleSubmit = (query) => {
    setPage(1);
    setQuery(query);
  };

  const handleSelectImage = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const incrementPage = () => {
    setPage((prev) => prev + 1);
  };

  const makeNotification = (text) => {
    toast(text, {
      autoClose: 2500,
      type: "info",
      theme: "colored",
    });
  };

  const maxPage = Math.ceil(totalHits / 12);

  return (
    <div>
      <Searchbar submit={handleSubmit} notify={makeNotification} />

      {images && <ImageGallery onSelect={handleSelectImage} images={images} />}

      {status === "pending" && <Loader />}

      {status === "resolved" && page < maxPage && (
        <Button page={page} onClick={incrementPage} />
      )}

      {status === "rejected" && <h1>{error.message}</h1>}

      <ToastContainer />

      {selectedImageUrl && (
        <Modal handleClose={closeModal}>
          <img src={selectedImageUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
