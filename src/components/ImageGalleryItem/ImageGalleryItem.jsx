function ImageGalleryItem({ item, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={item.webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
