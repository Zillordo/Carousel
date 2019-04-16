import React, { useState, useEffect } from 'react';

import './style/style.css';

import Backdrop from './components/Backdrop';
import Settings from './components/settingsmodal';

const Slider = ({ data, size }) => {

  return data.tiles.map(item => {



    const Link = () => {
      if (item.btnLink.length !== 0) {
        return (
          <div className='link' htmlFor='linkid'>
            <a id='linkid' href={item.btnLink} target={item.btnOption} rel="noopener noreferrer">{item.btnText}</a>
          </div>

        )
      }
      else {
        return <div></div>;
      }
    }

    if (!item.positive && item.background.trim().length !== 0) {
      let img = {
        background: `url(${item.background}) no-repeat center center`,
        backgroundSize: 'cover'
      }

      return (
        <div key={item.id} className="carousel" style={{ ...img, ...size }}>
          <div>
            <h1 style={{ color: `${item.color}` }}>{item.heading}</h1>
            <h3 style={{ color: `${item.color}` }}>{item.subHeader}</h3>
          </div>
          <Link />
        </div>
      )
    }
    return null;
  })
}

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(
    {
      increment: 0,
      size: '',
      animation: 'Fortine wheel',
      time: 2,
      tiles: []
    }
  );

  useEffect(() => {
    let dataGet = JSON.parse(localStorage.getItem('data'));
    if (dataGet === null) {
      dataGet = {
        increment: 0,
        size: 'l',
        animation: 'Fortine wheel',
        time: 2,
        tiles: []
      }

    }
    setData(dataGet);
  }, [toggle]);


  const size = (size) => {
    if (size === 's') return { height: '360px' }
    else if (size === 'm') return { height: '540px' }
    else if (size === 'l') return { height: '100vh' }
  }

  return (
    <>
      <div className='app'>
        <div className="carousel--container">
          <Slider data={data} size={size(data.size)} />
        </div>
        <button className='settingsbtn' onClick={() => setToggle(() => !toggle)}>Settings</button>
        {toggle && <Backdrop />}
        {toggle && <Settings toggle={() => setToggle(!toggle)} />}
      </div>
    </>
  );
}

export default App;
