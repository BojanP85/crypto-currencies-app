import React from 'react';
import { Link } from 'react-router-dom';

import { Table, PercentTd } from '../styles/table';
import { numberFormatting } from '../util/numberFormatting';

const CurrenciesTable = props => {
  const { channel } = props;

  const renderPairs = () => {
    return Object.keys(channel).map(key => {
      return (
        <tr key={Math.random()}>
          <td>
            <Link to={`/details/${key}`}>{key.substring(1)}</Link>
          </td>
          <td>{numberFormatting(channel[key][6])}</td>
          <td>{numberFormatting(channel[key][4])}</td>
          <PercentTd GreaterThanZero={channel[key][5] > 0 ? true : false}>
            {numberFormatting(channel[key][5] * 100, true)}%
          </PercentTd>
          <td>{numberFormatting(channel[key][8])}</td>
          <td>{numberFormatting(channel[key][9])}</td>
        </tr>
      );
    });
  };

  return (
    <Table Percent>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last</th>
          <th>Change</th>
          <th>Change Percent</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      <tbody>
        {renderPairs()}
      </tbody>
    </Table>
  );
};

export default CurrenciesTable;
