import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../contexts/auth';
import { Table } from '../styles/table';
import { Button } from '../styles/button';

const Details = props => {
  const { user } = useContext(AuthContext);

  const { id } = props.match.params;
  const symbol = id.substring(1);

  let existingPairs = localStorage.getItem('favoritePairs');

  const [pair, setPair] = useState([]);
  const [favoritePairs, setFavoritePairs] = useState(existingPairs);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/pubticker/${symbol}`)
      .then(res => {
        const response = res.data;
        if (isMounted) setPair(response);
      })
      .catch(error => {
        console.log(error);
      });

      return () => { isMounted = false };
  }, [symbol]);

  const renderRow = () => {
    return pair && (
      <tr>
        <td>{symbol}</td>
        <td>{pair.last_price}</td>
        <td>{pair.high}</td>
        <td>{pair.low}</td>
      </tr>
    );
  };

  const addToFavorites = data => {
    existingPairs = existingPairs ? existingPairs.split(',') : [];
    existingPairs.push(data);
    setFavoritePairs(existingPairs.toString());
    localStorage.setItem('favoritePairs', existingPairs.toString());
  };

  const removeFromFavorites = data => {
    existingPairs = existingPairs.split(',');
    const newPairs = existingPairs.filter(pair => pair !== data);
    setFavoritePairs(newPairs.toString());
    localStorage.setItem('favoritePairs', newPairs.toString());
  };

  const renderAddToButton = () => {
    if (user) {
      return favoritePairs.includes(symbol) ? (
        <Button onClick={() => removeFromFavorites(symbol)} Favorites Remove>Remove from favorites</Button>
      ) : (
        <Button onClick={() => addToFavorites(symbol)} Favorites>Add to favorites</Button>
      );
    };
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last price</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {renderRow()}
        </tbody>
      </Table>
      {renderAddToButton()}
    </>
  );
};

export default Details;
