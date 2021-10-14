import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.Remove ? '#eb4034' : '#01d1d1')};
  color: #fff;
  font: inherit;
  border: 1px solid ${props => (props.Remove ? '#eb4034' : '#01d1d1')};
  border-radius: 3px;
  padding: 0.5rem 2rem;
  margin-left: ${props => (props.Favorites ? '5%' : '')};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover,
  &:active {
    background: ${props => (props.Remove ? '#a82e25' : '#01a7a7')};
    border-color: ${props => (props.Remove ? '#a82e25' : '#01a7a7')};
  }
`;
