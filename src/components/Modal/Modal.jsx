import { OverlayModal, ModalWindow } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image, user } = this.props;
    return (
      <OverlayModal onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={image} alt={user} />
        </ModalWindow>
      </OverlayModal>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
