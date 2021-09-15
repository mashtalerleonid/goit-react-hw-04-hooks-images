import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";

class ImageGallery extends Component {
  render() {
    const { images, onSelect } = this.props;

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
}

export default ImageGallery;
