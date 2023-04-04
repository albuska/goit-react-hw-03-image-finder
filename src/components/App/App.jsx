import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import { SearchBar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    perPage: 12,
    error: null,
    loading: false,
    totalPage: 0,
  };

  handleSearchFormSubmit = inputValue => {
    this.setState({ inputValue, images: [], page: 1 });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Oops...No such name found ${this.props.inputValueName}`)
          );
        })
        .then(data => {
          if (data.hits.length === 0) {
            toast.error(`Oops...No such name found ${this.state.inputValue}`);
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
      <AppContainer>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        {error && <h1>{error.message}</h1>}
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && (
          <div>
            <Loader />
          </div>
        )}

        {showButton && !loading && page < totalPage && (
          <Button onClick={this.handleReadMore} />
        )}
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
