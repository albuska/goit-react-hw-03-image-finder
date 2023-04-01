import styled from "styled-components";

export const Container = styled.div`
width: 1170px;
padding-left: 15px;
padding-right: 15px; 
margin: 0 auto;
`

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`