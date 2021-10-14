import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: #fff;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 4px 6px -6px #222;

  div {
    display: flex;
    justify-content: space-between;
    width: 8rem;
  }

  h1 {
    margin: 0;
    font: inherit;
  }

  a {
    text-decoration: none;
    color: #000;

    &:hover,
    &:active,
    &.active {
      color: #01d1d1;
    }
  }
`;
