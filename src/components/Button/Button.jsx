import { useEffect } from "react";

function Button({ page, onClick }) {
  useEffect(() => {
    if (page === 1) {
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
  }, [page]);

  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
