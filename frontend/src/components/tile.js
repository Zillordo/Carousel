import React, { useState } from 'react';

const Tile = ({ data }) => {

    const [slider, setSlider] = useState(data.positive);
    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);


    return (
        <div className="tile">
            <div className="subheader">
                <div className="dnd"></div>
                <input type="text" value={subHead} onChange={e => setSubeHead(e.target.value)} />
            </div>
            <div className="heading">
                <input type="text" value={head} onChange={e => setHead(e.target.value)} />
            </div>
            <div className="positive">
                <button onClick={() => setSlider(!slider)} style={slider ? { backgroundColor: '#dadada' } : { backgroundColor: '#9700fd' }}>
                    <div className="slider" style={slider ? { float: 'left' } : { float: 'right' }}></div>
                </button>
            </div>
        </div>
    )
}

export default Tile;