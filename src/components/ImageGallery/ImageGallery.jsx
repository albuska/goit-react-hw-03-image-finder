import {ImageGalleryList, Container} from './ImageGallery.styled';
import { Component } from 'react';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'; 
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    value: null,
    // loading: false,
    error: null,
    status: 'idle',  
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.page)
    if (prevProps.inputValueName !== this.props.inputValueName) {
      // this.setState({loading: true, value: null})
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.inputValueName}&page=${this.props.page}&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=${this.props.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `Немає зображень або фото з таким іменем ${this.props.inputValueName}`
            )
          );
        })
        .then(value => this.setState({ value, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ loading: false }));
    }

  }
  setApiDate = () => {
    this.props.onSubmit(this.state.value);
    console.log(this.state.value)
  }


  render() {
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
      return <div>{this.state.error.message}</div>;
    }
    if (this.state.status === 'resolved') {
      const { hits } = this.state.value;

      return (
        <Container>
          <ImageGalleryList>
            {hits.map(hit => (
              <ImageGalleryItem
                key={hit.id}
                item={hit}
              />
            ))}
          </ImageGalleryList>
        </Container>
      );
    }
  }
};

// ImageGallery.propTypes = {
//   hits: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }).isRequired, 
//   ).isRequired,
// };