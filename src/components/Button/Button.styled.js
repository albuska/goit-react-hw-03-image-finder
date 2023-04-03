import styled from 'styled-components';

export const ButtonReadMore = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-image: linear-gradient(
    to right top,
    #dde9f7,
    #b0c0c6,
    #8b9797,
    #6a6f6c,
    #494a48
  );
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  align-items: center;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  :hover {
    background: #696969;
  }
`;
