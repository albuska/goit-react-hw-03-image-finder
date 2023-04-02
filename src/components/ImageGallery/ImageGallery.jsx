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
    value: null,
    error: null,
    status: 'idle',
    totalPage: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValueName !== this.props.inputValueName || prevState.page !== this.state.page) {
      // this.setState({page: 1, images: []}); 
      this.setState({ status: 'pending'});
      fetch(
        `https://pixabay.com/api/?q=${this.props.inputValueName}&page=${this.state.page}&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `Oops...No such name found ${this.props.inputValueName}`
            )
          );
        })
        .then(value => {
          if(value.hits.length === 0) {
            toast.error(`Oops...No such name found ${this.props.inputValueName}`)  
          }
          this.setState({ images: [...value.hits], status: 'resolved' })
          console.log("🚀 ~ ImageGallery ~ componentDidUpdate ~ value:", ...value.hits)
          const pages = Math.ceil(value.totalHits / this.state.perPage)
          this.setState({totalPage: pages})
      
          // this.setState({images: [...value.hits]})
    
          // this.setState(prevState => {
          //   return {
          //     images: [...prevState.images, ...value.hits],
          //   };
          // });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));       
    }
  }

  handleReadMore = () => {
    // const { value } = this.state;
    console.log(this.state.images)
    this.setState(prevState => {
      return {
        images: [...prevState.images],
        page: prevState.page + 1,
      };
    });
  };

  render() {
    
    const showButton = this.state.images.length >= 12;

    if (this.state.status === 'idle') {
      return;
    }

    if (this.state.status === 'pending') {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    if (this.state.status === 'rejected') {
      return <h1>{this.state.error.message}</h1>;
    }
    if (this.state.status === 'resolved') {
      console.log(this.state.images);
      const { images, page, totalPage } = this.state;
      return (
        <Container>
          <ImageGalleryList>
            {images.map(image => (
              <ImageGalleryItem key={image.id} item={image} />
            ))}
          </ImageGalleryList>

          {showButton && (
            <Button onClick={this.handleReadMore} hidden={page === totalPage} />
          )}
        </Container>
      );
    }
  }
}
