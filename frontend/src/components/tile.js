import React, { useState } from 'react';

const Tile = ({ subheader, heading, positive, ...props }) => {

    const [slider, setSlider] = useState(positive);
    const [subHead, setSubeHead] = useState(subheader);
    const [head, setHead] = useState(heading);


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