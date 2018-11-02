import styled from 'styled-components';

const SickButton = styled.button`
  background: ${props => props.theme.red};
  cursor:pointer;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 1.5rem;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
