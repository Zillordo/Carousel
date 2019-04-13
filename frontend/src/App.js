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

  const [tile, setTile] = useState(
    {
      subHeader: "",
      heading: "",
      positive: false,
      background: ""
    }
  );

  const [data, setData] = useState(
    {
      increment: 0,
      size: "l",
      animation: "Fortine wheel",
      time: 2,
      tiles: []
    }
  );


  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <button onClick={() => setToggle(() => !toggle)}>Settings</button>
        {toggle && <Backdrop />}
        {toggle && <Settings
          toggle={() => setToggle(() => !toggle)}
          data={data}
        />}
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
