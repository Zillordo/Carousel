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
    };

    let img = {
      background: `url(${item.background}) no-repeat center center`,
      backgroundSize: 'cover'
    };

    if (!item.positive && item.background.trim().length !== 0) {

      return (
        <div key={item.id} className="carousel" style={{ ...img, ...size }}>
          <div>
            <h1 style={{ color: `${item.color}` }}>{item.heading}</h1>
            <h3 style={{ color: `${item.color}` }}>{item.subHeader}</h3>
          </div>
          <Link />
        </div>
      );
    }
    return null;
  });
}

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(
    {
      increment: 0,
      size: '',
      animation: 'right',
      time: 2,
      tiles: []
    }
  );

  const getData = () => {

    let dataGet = JSON.parse(localStorage.getItem('data'));

    if (dataGet === null) {
      dataGet = { ...data }
    };

    let newData = dataGet.tiles.filter(item => item.positive === false);

    if (newData.length > 1) {
      if (newData !== null) {
        let item = newData[0];
        let tile = JSON.parse(JSON.stringify(item));
        tile.id = Math.random().toString(36).substr(2, 16);
        dataGet.tiles.push(tile);
      };
    };


    setData(dataGet);
  }

  useEffect(() => {
    getData();
  }, []);

  const smoothCarouselLeft = () => {
    let element = document.getElementById('header-carousel');
    if (element.scrollLeft === 0) {
      element.scroll({ top: 0, left: element.scrollWidth - element.clientWidth });
      element.scroll({ top: 0, left: element.scrollLeft - element.clientWidth, behavior: 'smooth' });
    }
    else {
      element.scroll({ top: 0, left: element.scrollLeft - element.clientWidth, behavior: 'smooth' });
    }
  }


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
      if (data.animation === 'right') {
        smoothCarouselRight();
      }
      else if (data.animation === 'left') {
        smoothCarouselLeft();
      }
    }, data.time * 1000);
  }

  useEffect(() => {
    let interval = timeOut();
    return () => clearInterval(interval);
  }, [data.time, data.animation]);

  const size = (size) => {
    if (size === 's') return { height: '360px' }
    else if (size === 'm') return { height: '540px' }
    else if (size === 'l') return { height: '100vh' }
  }

  const arrowPosition = (size) => {
    if (size === 's') return { top: '20%' }
    else if (size === 'm') return { top: '30%' }
    else if (size === 'l') return { top: '40%' }
  }

  return (
    <>
      <div className='app'>
        <div className="carousel--container" id="header-carousel">
          <button className="moveRight" onClick={smoothCarouselRight} style={arrowPosition(data.size)}></button>
          <Slider data={data.tiles} size={size(data.size)} />
          <button className="moveLeft" onClick={smoothCarouselLeft} style={arrowPosition(data.size)}></button>
        </div>
        <button className='settingsbtn' onClick={() => setToggle(() => !toggle)}></button>
        {toggle && <Backdrop>
          <Settings toggle={() => { setToggle(!toggle); getData() }} />
        </Backdrop>}
      </div>
    </>
  );
}

export default App;
