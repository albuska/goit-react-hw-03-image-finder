import { Component } from 'react';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  handleOpenModal = () => {
    this.setState({ isOpenModal: true });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const {
      item: { webformatURL, user, largeImageURL },
    } = this.props;
    return (
      <ImageGalleryItemLi>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={user}
          onClick={this.handleOpenModal}
        />
        {this.state.isOpenModal && (
          <Modal
            image={largeImageURL}
            user={user}
            closeModal={this.handleCloseModal}
          />
        )}
      </ImageGalleryItemLi>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};
