import React, { useState, useEffect } from 'react';
import Tile from './tile';


const useForceUpdate = () => {
    const [value, set] = useState(true);
    return () => set(!value);
}

const Settings = ({ toggle }) => {

    const forceUpdate = useForceUpdate();


    const [data, setData] = useState(
        {
            increment: 0,
            size: '',
            animation: '',
            time: null,
            tiles: []
        }
    );

    const newTile = {
        subHeader: "",
        heading: "",
        positive: true,
        background: ""
    };

    const save = () => {
        localStorage.setItem('data', JSON.stringify(data));
    }

    useEffect(() => {
        let dataGet = JSON.parse(localStorage.getItem('data'));
        setData(dataGet);
    }, []);



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
                        <button onClick={() => { forceUpdate(); data.size = 's' }} style={data.size === 's' ? { backgroundColor: '#9700fd' } : { backgroundColor: '#ffffff' }}>S</button>
                        <button onClick={() => { forceUpdate(); data.size = 'm' }} style={data.size === 'm' ? { backgroundColor: '#9700fd' } : { backgroundColor: '#ffffff' }}>M</button>
                        <button onClick={() => { forceUpdate(); data.size = 'l' }} style={data.size === 'l' ? { backgroundColor: '#9700fd' } : { backgroundColor: '#ffffff' }}>L</button>
                    </div>
                    <div className="header--animation">
                        <p>Animations</p>
                        <select value={data.animation} onChange={e => { forceUpdate(); data.animation = e.target.value }}>
                            <option value="Fortine">Fortine wheel</option>
                            <option value="Animation">Animation</option>
                        </select>
                        <select value={data.time} onChange={e => { forceUpdate(); data.time = e.target.value }}>
                            <option value={2}>Auto 2 sec</option>
                            <option value={5}>Auto 5 sec</option>
                            <option value={10}>Auto 10 sec</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="settings--body">
                <div className="body-add">Tiles</div>
                <button onClick={() => { data.tiles.push(newTile); forceUpdate() }}>Add</button>
                <div className="body--tiles">
                    <p>SUBHEADER</p><p>HEADING</p><p>POSITIVE</p><p>BACKGROUND</p>
                    <div className="list">
                        {renderTiles()}
                    </div>
                </div>
            </div>
            <div className="settings--footer">
                <button onClick={() => { save(); toggle() }}>SAVE</button>
            </div>
        </div>
    )
}

export default Settings;