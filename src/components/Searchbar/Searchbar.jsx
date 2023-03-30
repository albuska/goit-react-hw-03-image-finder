import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import {ImSearch} from 'react-icons/im'; 
// import PropTypes from 'prop-types';

export class SearchBar extends Component {

    state = {
inputValue: "",  
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.inputValue.trim() === "") {
            toast.error("Search images and photos")  
            return; 
        }
    this.props.onSubmit(this.state.inputValue); 
    this.setState({inputValue: ""}); 
    
      }

  handleInputChange = (event) => {
this.setState({inputValue: event.currentTarget.value.toLowerCase()})
  }

  render() {
    const {inputValue} = this.state; 
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>

          <SearchFormInput
            name="inputValue"
            type="text"
            autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
};
