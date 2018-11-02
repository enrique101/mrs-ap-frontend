import styled from 'styled-components';

const Item = styled.div`
  background: white;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 50px;
  grid-row-gap: 2rem;
  
  a.item-card{
    transition: box-shadow 0.3s ease-in-out;
    border-left: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    :hover{
      box-shadow: ${props => props.theme.bs};
    }

  }

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
    grid-auto-flow: column;
    a{
      display:grid;
    }
  }
`;

export default Item;
