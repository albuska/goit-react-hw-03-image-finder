import { ButtonReadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <ButtonReadMore type="button" onClick={onClick}>
      Load more
    </ButtonReadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
