import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import {SearchBar} from '../Searchbar/Searchbar'; 
import { ToastContainer} from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
state = {
  inputValue: '', 
}

handleSearchFormSubmit = inputValue => {
  console.log(inputValue);
this.setState({inputValue}); 
}

  render() {
  return (
    <AppContainer>
     <SearchBar onSubmit={this.handleSearchFormSubmit}/>
<ImageGallery inputValueName={this.state.inputValue}/>
      <GlobalStyle />
      <ToastContainer autoClose={3000}/>
    </AppContainer>
  );
}
};
