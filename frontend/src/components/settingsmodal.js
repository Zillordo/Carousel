import React, { useState, useContext, createContext } from 'react';
import Reorder, { reorder } from 'react-reorder';


const Tile = ({subheader, ...props}) => {

    const [slider, setSlider] = useState(true);


    return (
        <React.Fragment>
            <div className="tile">
                <div className="subheader">
                    <div className="dnd"></div>
                    <input type="text" value={subheader}/>
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

const Tiles = () => {

    const [tile, setTile] = useState(["Photo", "Nature", "Car"]);


    const order = (event, previusIndex, nextIndex) => {
        event.preventDefault();
        setTile(() => reorder(tile, previusIndex, nextIndex));
    }

    return (
        <React.Fragment>
            <Reorder reorderId="my-list" autoScroll={true} className="list" onReorder={order} holdTime={150}>
                {tile.map(item =>
                    <div key={item}>
                        <Tile
                            subheader={item}
                        />
                    </div>
                )}
            </Reorder>
        </React.Fragment>
    )
}

const Settings = ({ toggle }) => {

    
    return (
        <div className="settings">
            <button className="settings--canclebtn" onClick={toggle}>X</button>
            <div className="settings--header">
                <h1>Header Settings</h1>
                <div className="header--options">
                    <div className="header--sizes">
                        <p>Size</p>
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                    </div>
                    <div className="header--animation">
                        <p>Animations</p>
                        <select>
                            <option>Frtine wheel</option>
                        </select>
                        <select>
                            <option>Auto 2 sec</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="settings--body">
                <div className="body-add">Tiles</div>
                <div className="body--tiles">
                    <p>SUBHEADER</p><p>HEADING</p><p>POSITIVE</p><p>BACKGROUND</p>
                    <Tiles />
                </div>
            </div>
            <div className="settings--footer">
                <button>SAVE</button>
            </div>
        </div>
    )
}

export default Settings;