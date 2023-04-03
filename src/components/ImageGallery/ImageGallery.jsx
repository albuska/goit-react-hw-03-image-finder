import { ImageGalleryList, Container } from './ImageGallery.styled';
import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    perPage: 12,
    error: null,
    loading: false,
    totalPage: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.inputValueName !== this.props.inputValueName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      if (prevProps !== this.props) this.setState({ images: [], page: 1 });
      fetch(
        `https://pixabay.com/api/?q=${this.props.inputValueName}&page=${this.state.page}&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          // return Promise.reject(
          //   new Error(`Oops...No such name found ${this.props.inputValueName}`)
          // );
        })
        .then(data => {
          if (data.hits.length === 0) {
            toast.error(
              `Oops...No such name found ${this.props.inputValueName}`
            );
          }
          const pages = Math.ceil(data.totalHits / this.state.perPage);
          this.setState(({ images, totalPage, loading }) => ({
            images: [...images, ...data.hits],
            totalPage: pages,
            loading: true,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleReadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const showButton = this.state.images.length >= 12;
    const { images, page, totalPage, loading, error } = this.state;

    return (
      <Container>
        {error && <h1>{error.message}</h1>}
        {loading && (
          <div>
            <Loader />
          </div>
        )}
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </ImageGalleryList>

        {showButton && page < totalPage && (
          <Button onClick={this.handleReadMore} />
        )}
      </Container>
    );
  }
}
