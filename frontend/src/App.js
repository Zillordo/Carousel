import React, { useState } from 'react';

import './style/style.css';

import Backdrop from './components/Backdrop';
import Settings from './components/settingsmodal';



const App = () => {
  const [toggle, setToggle] = useState(false);


  return (
    <React.Fragment>
      <button onClick={() => setToggle(() => !toggle)}>Settings</button>
      {toggle &&
        <Backdrop>
          <Settings
            toggle={() => setToggle(() => !toggle)}
          />
        </Backdrop>
      }
    </React.Fragment>
  );
}

export default App;
