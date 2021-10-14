import styled from 'styled-components';

export const Message = styled.div`
  text-align: center;
  border: 1px solid #01d1d1;
  border-radius: 5px;
  padding: 1rem;
  margin: 100px auto 15px auto;
  width: 20rem;
  max-width: 80%;

  p {
    font-size: 1.2rem;

    @media(max-width: 426px) {
      font-size: 1rem;
    }
  }
`;
