import React from 'react';

import CurrenciesTable from '../components/CurrenciesTable';

const Home = props => <CurrenciesTable channel={props.channels} />;

export default Home;
