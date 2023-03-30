import {ImageGalleryList} from './ImageGallery.styled';
import { Component } from 'react';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'; 
// import PropTypes from 'prop-types';

export class ImageGallery extends Component {

  state = {
value: null, 
// loading: false, 
error: null, 
status: 'idle',
  }

componentDidUpdate(prevProps, prevState) {
  if(prevProps.inputValueName !== this.props.inputValueName) {
      console.log(prevProps.inputValueName)
      console.log(this.props.inputValueName)
      // this.setState({loading: true, value: null})
  this.setState({loading: true, value: ''}); 
      fetch(
          `https://pixabay.com/api/?q=${this.props.inputValue}&page=1&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
              if(response.ok) {
                  return response.json(); 
              }
              return Promise.reject(
                  new Error(`Немає зображень або фото з таким іменем ${this.props.inputValue}`)
                );
          })
          .then(value => this.setState({inputValue: value, status: 'resolved'}))
          .catch(error => this.setState({error, status: 'rejected'}))
          // .finally(() => this.setState({ loading: false }));
  }
}

render() {
  if(this.state.status === 'idle') {
    return;
  }

  if(this.state.status === 'pending') {
    return <div>Loading...</div>
  }

  if(this.state.status === 'rejected') {
    return <div>{this.state.error.message}</div>
}
if(this.state.status === 'resolved') {
  return (
    <ImageGalleryList>
    {/* <ImageGalleryItem items={this.state.value}/> */}
  </ImageGalleryList>
  )
}
}
};