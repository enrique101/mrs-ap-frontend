import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.5rem;
  a,
  button {
    padding: 1rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    color: ${props => props.theme.black};
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }

    &:after {
      height: 2px;
      background: ${props => props.theme.red};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 30px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
