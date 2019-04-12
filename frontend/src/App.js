import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './style/style.css';

import Backdrop from './components/Backdrop';
import Settings from './components/settingsmodal';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <button onClick={() => setToggle(() => !toggle)}>Settings</button>
        {toggle && <Backdrop />}
        {toggle && <Settings
          toggle={() => setToggle(() => !toggle)}
        />}
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
