import {ButtonReadMore} from './Button.styled';
// import PropTypes from 'prop-types';

export const Button = ({items, perPage, onClick}) => {
    console.log(items); 
       //   const pages = Math.ceil(totalHits / perPage);
    return (
<ButtonReadMore type="button" onClick={onClick}>Read more</ButtonReadMore>
    )
}