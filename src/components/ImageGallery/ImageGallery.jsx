import ImageGalleryItem from "components/ImageGalleryItem";

function ImageGallery({ onSelect, images }) {
  return (
    <div>
      <ul className="ImageGallery">
        {images.map((item) => {
          return (
            <ImageGalleryItem
              key={item.id}
              item={item}
              onClick={() => onSelect(item.largeImageURL)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ImageGallery;
