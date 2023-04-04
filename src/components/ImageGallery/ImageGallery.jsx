import { ImageGalleryList, Container } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <Container>
      <ImageGalleryList>
        {images.map(image => (
          <ImageGalleryItem key={image.id} item={image} />
        ))}
      </ImageGalleryList>
    </Container>
  );
};
