import React, { useState } from 'react';

const Tile = ({ data, id }) => {

    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);
    const [slider, setSlider] = useState(data.positive);


    return (
        <div className="tile">
            <div className="subheader">
                <div className="dnd"></div>
                <input type="text" value={subHead} onChange={e => { data.subHeader = e.target.value; setSubeHead(e.target.value) }} />
            </div>
            <div className="heading">
                <input type="text" value={head} onChange={e => {data.heading = e.target.value; setHead(e.target.value)}} />
            </div>
            <div className="positive">
                <button onClick={() => {data.positive = !slider; setSlider(!slider)}} style={slider ? { backgroundColor: '#dadada' } : { backgroundColor: '#9700fd' }}>
                    <div className="slider" style={slider ? { float: 'left' } : { float: 'right' }}></div>
                </button>
            </div>
        </div>
    )
}

export default Tile;