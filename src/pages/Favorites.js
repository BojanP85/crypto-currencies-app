import React, { useEffect } from 'react';

import { Message } from '../styles/message';
import CurrenciesTable from '../components/CurrenciesTable';
import { useWebsocket } from '../util/hooks';

const Favorites = () => {
  const { channels, pairs, setPairs } = useWebsocket({}, []);

  useEffect(() => {
    let isMounted = true;

    const storagePairs = localStorage.getItem('favoritePairs');
    const pairsArr = storagePairs ? storagePairs.split(',') : null;
    if (isMounted) setPairs(pairsArr);

    return () => { isMounted = false };
  }, [setPairs]);

  const renderTable = () => {
    if (!pairs || (pairs.length === 1 && pairs[0] === '')) {
      return (
        <Message>
          <p>Favorites list is empty.</p>
        </Message>
      );
    }

    return <CurrenciesTable channel={channels} />;
  };

  return renderTable();
};

export default Favorites;
