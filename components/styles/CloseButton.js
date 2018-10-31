import styled from 'styled-components';

const CloseButton = styled.button`
  background: ${props => props.theme.red};
  color: #fff;
  font-size: 4rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
