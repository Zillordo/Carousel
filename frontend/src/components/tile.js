import React, { useState } from 'react';
import Backdrop from './Backdrop';

const Background = () => {
    return (
        <div className="modular--background">
            hey
            hey
            hey
            hey
        </div>
    )
}

const Tile = ({ data, id }) => {

    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);
    const [slider, setSlider] = useState(data.positive);

    const [backToggle, setBackToggle] = useState();


    return (
        <React.Fragment>
            <div className="tile">
                <div className="subheader">
                    <div className="dnd"></div>
                    <input type="text" value={subHead} onChange={e => { data.subHeader = e.target.value; setSubeHead(e.target.value) }} />
                </div>
                <div className="heading">
                    <input type="text" value={head} onChange={e => { data.heading = e.target.value; setHead(e.target.value) }} />
                </div>
                <div className="positive">
                    <button onClick={() => { data.positive = !slider; setSlider(!slider) }} style={slider ? { backgroundColor: '#dadada' } : { backgroundColor: '#9700fd' }}>
                        <div className="slider" style={slider ? { float: 'left' } : { float: 'right' }}></div>
                    </button>
                </div>
                <div className="background">
                    <button onClick={() => setBackToggle(!backToggle)}></button>
                </div>
            </div>
            {backToggle && <Background/>}
        </React.Fragment>
    )
}

export default Tile;