import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 90%;
  margin: 100px auto 15px auto;
  box-shadow: 0 0 10px -6px #222;

  @media(max-width: 426px) {
    font-size: 0.8rem;
  }

  th, td {
    padding: 10px;
    text-align: right;
    border-bottom: 1px solid rgba(238, 238, 238, 0.8);
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  thead th {
    border: 0px;
  }

  tbody tr {
    &:hover {
      background-color: #f2f2f2;
    }
  }

  a {
    text-decoration: none;
    color: #01d1d1;

    &:hover {
      color: #008a8a;
    }
  }
`;

export const PercentTd = styled.td`
  color: ${props => (props.GreaterThanZero ? '#0fd963' : '#f54545')};
`;
