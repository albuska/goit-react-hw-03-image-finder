import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import { SearchBar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    getApi: [],
    inputValue: '',
    page: 1,
    per_page: 12,
    // isOpenModal: false,
  };

// handleOpenModal = () => {
//   this.setState({isOpenModal: true})
// }
  getApiData = data => {
    console.log(data);
    const newImagesList = {
      ...data,
    }
      this.setState(prevState => ({
        getApi: [...prevState.getApi, newImagesList],
        page: +1, 
      }))
    };

  

  // handleReadMore = () => {
  //   this.setState((prevState) => {
  //     return {
  //       page: prevState.page += 1,
  //     };
  //   });
  // }

  handleSearchFormSubmit = inputValue => {
    this.setState({ inputValue });
  };


  render() {
    const {inputValue, page, per_page} = this.state; 
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          onSubmit={this.getApiData}
          perPage={per_page}
          page={page}
          inputValueName={inputValue}
          // openModal={this.handleOpenModal}
        />
        {this.state.inputValue && (
          <Button
            perPage={per_page}
            items={inputValue}
            onClick={this.getApiData}
          />
        )}
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
