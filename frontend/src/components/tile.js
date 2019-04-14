import React, { useState } from 'react';


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


const Background = ({ getImage, ...props }) => {
    return (
        <div className="modular--background">
            {props.children}
            <div className="chip"></div>
            <div className="img--div"></div>
            <label htmlFor="file"><div></div>Upload image</label>
            <input type="file" id="file" onChange={getImage} />
        </div>
    )
}

const Tile = ({ data, id }) => {

    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);
    const [slider, setSlider] = useState(data.positive);
    const [img, setImg] = useState(null);
    const [color, setColor] = useState();

    const [backToggle, setBackToggle] = useState();


    getBase64(img, res => data.background = res);
    data.color = color;


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

            {
                backToggle &&
                <React.Fragment>
                    <div className="backdrop" onClick={()=> setBackToggle(!backToggle)}></div>
                    <Background getImage={e => setImg(e.target)}>
                        <div className="colors">
                            <button className="purple" onClick={() => setColor('#9700fd')}></button>
                            <button className="blue" onClick={() => setColor('#60cefe')}></button>
                            <button className="green" onClick={() => setColor('#49e5a5')}></button>
                            <button className="white" onClick={() => setColor('#ffffff')}></button>
                            <button className="black" onClick={() => setColor('#000000')}></button>
                            <button className="darkgGray" onClick={() => setColor('#808080')}></button>
                            <button className="lightGray" onClick={() => setColor('#dadada')}></button>
                            <button className="lightestGgray" onClick={() => setColor('#f5f5f5')}></button>
                        </div>
                    </Background>
                </React.Fragment>
            }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Tile;