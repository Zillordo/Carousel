import React, { useState, useEffect } from 'react';

import './style/style.css';

import Backdrop from './components/Backdrop';
import Settings from './components/settingsmodal';

const Slider = ({ data, size }) => {

  return data.map(item => {
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

  const getData = () => {

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
    if (dataGet.tiles.length > 1) {
      let newData = dataGet.tiles.map(item => {
        if (item.positive === false) {
          return item
        }
        return null;
      })

      let item = newData[0];

      let tile = {
        id: Math.random().toString(36).substr(2, 16),
        subHeader: item.subHeader,
        heading: item.heading,
        positive: item.positive,
        background: item.background,
        color: item.color,
        btnText: item.btnText,
        btnLink: item.btnLink,
        btnOption: item.btnOption
      }
      dataGet.tiles.push(tile);
    }
    setData(dataGet);
  }

  useEffect(() => {
    getData();
  }, []);

  const smoothCarouselRight = () => {
    let element = document.getElementById('header-carousel');
    if (element.scrollLeft >= element.scrollWidth - element.clientWidth) {
      element.scroll({ top: 0, left: 0 });
      element.scroll({ top: 0, left: element.scrollLeft + element.clientWidth, behavior: 'smooth' });
    }
    else {
      element.scroll({ top: 0, left: element.scrollLeft + element.clientWidth, behavior: 'smooth' });
    }
  }

  const timeOut = () => {
    return setInterval(() => {
      smoothCarouselRight();
    }, data.time * 1000);
  }

  useEffect(() => {
    let interval = timeOut();
    return () => clearInterval(interval);
  }, [data.time]);

  const size = (size) => {
    if (size === 's') return { height: '360px' }
    else if (size === 'm') return { height: '540px' }
    else if (size === 'l') return { height: '100vh' }
  }


  return (
    <>
      <div className='app'>
        <button className='settingsbtn' onClick={() => setToggle(() => !toggle)}>Settings</button>
        <div className="carousel--container" id="header-carousel">
          <Slider data={data.tiles} size={size(data.size)} />
        </div>
        {toggle && <Backdrop />}
        {toggle && <Settings toggle={() => { setToggle(!toggle); getData() }} />}
      </div>
    </>
  );
}

export default App;
