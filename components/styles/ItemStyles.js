import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 70px;

  img {
    width: 100%;
    object-fit: contain;
  }
  p {
    font-size: 1.5rem;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    color: ${props => props.theme.red};
    text-align:left;
  }

  .buttonList {
    display: grid;
    width: 100%;
    margin: 0;
    grid-gap: 1px;
    text-align:center;

    & > * {
      background: ${props => props.theme.red};
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
      color:#fff;
    }
    @media screen and (min-width: ${props => props.theme.desKBrk}) {
      transform:translateY(100%);
      transition: all 0.5s;
      opacity: 0;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }
  .icon-add-to-cart {
    font-size: 20px;
    display: block;
    line-height: 35px;
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: ${props => props.theme.desKBrk}) {
    overflow:hidden;
    transition: all 0.5s;
    :hover .buttonList{
      transform:translateY(0);
      opacity: 1;
    }
    /* :hover{
      transform: scale(1.05);
    } */
  }
`;

export default Item;
