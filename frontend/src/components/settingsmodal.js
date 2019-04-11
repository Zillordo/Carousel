import React, { useState } from 'react';
import Reorder, { reorder } from 'react-reorder';



const Tile = () => {

    const [tile, setTile] = useState(["Photo", "Nature", "Car"]);


    const order = (event, previusIndex, nextIndex) => {
        event.preventDefault();
        setTile(() => reorder(tile, previusIndex, nextIndex));
    }

    return (
        <React.Fragment>
            <Reorder reorderId="my-list" autoScroll={true} className="list" onReorder={order}>
                {tile.map(item =>
                    <div className="tile" key={item}>
                        <div className="dnd"></div>
                        {item}
                    </div>
                )}
            </Reorder>
        </React.Fragment>
    )
}

const Settings = props => {
    return (
        <div className="settings">
            <button className="settings--canclebtn" onClick={props.toggle}>X</button>
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
                    <Tile />
                </div>
            </div>
            <div className="settings--footer">
                <button>SAVE</button>
            </div>
        </div>
    )
}

export default Settings;