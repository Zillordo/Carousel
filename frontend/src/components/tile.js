import React, { useState } from 'react';
import Backdrop from './Backdrop';


const getBase64 = (element, cb) => {
    if (element === null) {
        return;
    }
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        cb(reader.result);
    }
    reader.onerror = err => {
        console.log(err);
    }
}


const Background = ({ getImage }) => {
    return (
        <div className="modular--background">
            <input type="file" onChange={getImage} />
        </div>
    )
}

const Tile = ({ data, id }) => {

    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);
    const [slider, setSlider] = useState(data.positive);
    const [img, setImg] = useState(null);

    const [backToggle, setBackToggle] = useState();


    getBase64(img, res => data.background = res);



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
            {backToggle && <Background getImage={e => setImg(e.target)} />}
        </React.Fragment>
    )
}

export default Tile;