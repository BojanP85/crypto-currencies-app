import React, { useEffect } from 'react';

import { Message } from '../styles/message';
import CurrenciesTable from '../components/CurrenciesTable';
import { useWebsocket } from '../util/hooks';

const Favorites = () => {
  const { channel, setChannel, pairs, setPairs } = useWebsocket({}, []);

  useEffect(() => {
    let isMounted = true;

    const pairsArr = localStorage.getItem('favoritePairs').split(',');
    if (isMounted) setPairs(pairsArr);

    for (let pair of pairsArr) {
      if (isMounted) {
        setChannel(prevValues => {
          return { ...prevValues, [`t${pair}`]: [] }
        });
      }
    }

    return () => { isMounted = false };
  }, [setChannel, setPairs]);

  const renderTable = () => {
    if (pairs.length === 1 && pairs[0] === '') {
      return (
        <Message>
          <p>Favorites list is empty.</p>
        </Message>
      );
    }

    return <CurrenciesTable channel={channel} />;
  };

  return renderTable();
};

export default Favorites;
