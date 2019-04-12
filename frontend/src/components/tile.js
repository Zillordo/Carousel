import React, { useState } from 'react';




const Tiles = ({...props}) => {

    const [slider, setSlider] = useState(true);


    return (
        <React.Fragment>
            <div className="tile">
                <div className="subheader">
                    <div className="dnd"></div>
                    <input type="text" value={props.subheader}></input>
                </div>
                <div className="heading">
                    <input type="text"></input>
                </div>
                <div className="positive">
                    <button onClick={() => setSlider(!slider)} style={slider ? { backgroundColor: '#dadada' } : { backgroundColor: '#9700fd' }}>
                        <div className="slider" style={slider ? { float: 'left' } : { float: 'right' }}></div>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Tiles;













// const [tile, setTile] = useState(
    //     {
    //         heading: '',
    //         subheader: '',
    //         positive: false,
    //     }
    // );
    // const [data, setData] = useState(
    //     {
    //         size: 's',
    //         animation: 'wheel',
    //         time: 2,
    //         tiles: [tile]
    //     });



    // const save = () => {
    //     localStorage.data = JSON.stringify(data);
    // }