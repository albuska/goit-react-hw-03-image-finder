import { ButtonReadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick, page, totalPage }) => {
  return (
    <ButtonReadMore type="button" onClick={onClick}>
      Load more
    </ButtonReadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// style={{display: "none"}}