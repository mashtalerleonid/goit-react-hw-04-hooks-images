import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

const modalRoot = document.querySelector("#modal-root");
const body = document.querySelector("body");

export default function Modal({ handleClose, children }) {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      handleClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    body.classList.add("scroll-lock");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.classList.remove("scroll-lock");
    };
  }, []);

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
      <button className="Close" type="button" onClick={handleClose}>
        <CloseIcon width="30" />
      </button>
    </div>,
    modalRoot
  );
}
