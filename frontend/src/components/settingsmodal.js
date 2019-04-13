import React, { useState, useEffect } from 'react';
import Tile from './tile';


const Settings = ({ toggle }) => {

    const [data, setData] = useState(
        {
          increment: 0,
          size: "l",
          animation: "Fortine wheel",
          time: 2,
          tiles: []
        }
      );
    
    
      const save = () => {
        localStorage.setItem('data', JSON.stringify(data));
      }
    
      useEffect(() => {
        let data = JSON.parse(localStorage.getItem('data'));
        setData(data);
      },[]);

    const [state, setState] = useState(data.tiles);
    const originTiles = state;

    console.log(state, data, originTiles);

    const newTile = {
        subHeader: "",
        heading: "",
        positive: true,
        background: ""
    };

    const renderTiles = () => {
        return data.tiles.map(item => {
            data.increment++;
            return (
                <Tile key={data.increment} data={item} />
            )
        }
        );
    }

    

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
                <button onClick={() => { data.tiles.push(newTile); setState([...data.tiles]) }}>Add</button>
                <div className="body--tiles">
                    <p>SUBHEADER</p><p>HEADING</p><p>POSITIVE</p><p>BACKGROUND</p>
                    <div className="list">
                        {renderTiles()}
                    </div>
                </div>
            </div>
            <div className="settings--footer">
                <button onClick={save}>SAVE</button>
            </div>
        </div>
    )
}

export default Settings;