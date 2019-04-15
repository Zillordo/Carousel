import React, { useState, useEffect } from 'react';
import Tile from './tile';
import useForceRender from '../helpers/customHooks';


const Settings = ({ toggle }) => {

    const forceRender = useForceRender();
    let random = Math.random().toString(36).substr(2, 16);

    const [data, setData] = useState(
        {
            increment: 0,
            size: 'l',
            animation: 'Fortine wheel',
            time: 2,
            tiles: []
        }
    );

    const newTile = {
        id: random,
        subHeader: '',
        heading: '',
        positive: true,
        background: '',
        color: '',
        btnText: '',
        btnLink: '',
        btnOption: ''
    };

    const save = () => {
        localStorage.setItem('data', JSON.stringify(data));
    }

    useEffect(() => {
        let dataGet = JSON.parse(localStorage.getItem('data'));
        if (dataGet === null) {
            dataGet = {
                increment: 0,
                size: 'l',
                animation: 'Fortine wheel',
                time: 2,
                tiles: []
            }

        }
        setData(dataGet);
    }, []);


    const deleteTile = (id) => {
        let newTiles = data.tiles.filter(tileId => {
            return tileId.id !== id;
        });
        forceRender();

        setData({ tiles: newTiles, increment: data.increment, size: data.size, animation: data.animation, time: data.time });
    }

    const copyTile = (id) => {
        let newData = data.tiles.filter(tileId => {
            return tileId.id === id;
        });

        let item = newData[0];

        let tile = {
            id: random,
            subHeader: item.subHeader,
            heading: item.heading,
            positive: item.positive,
            background: item.background,
            color: item.color,
            btnText: item.btnText,
            btnLink: item.btnLink,
            btnOption: item.btnOption
        }
        data.tiles.push(tile);
        forceRender();
    }

    const renderTiles = () => {
        if (data == null) {
            return;
        }
        return data.tiles.map(item => {
            data.increment++;
            return (
                <Tile key={data.increment} data={item} deleteTile={() => deleteTile(item.id)} copyTile={() => copyTile(item.id)} />
            )
        }
        );
    }



    return (
        <div className="settings">
            <button className="settings--canclebtn" onClick={toggle}>×</button>
            <div className="settings--header">
                <h1>Header Settings</h1>
                <div className="header--options">
                    <div className="header--sizes">
                        <p>Size</p>
                        <button 
                        onClick={() => { forceRender(); data.size = 's' }} 
                        style={data.size === 's' ? { backgroundColor: '#9700fd', color: 'white' } : null}>S</button>
                        <button 
                        onClick={() => { forceRender(); data.size = 'm' }} 
                        style={data.size === 'm' ? { backgroundColor: '#9700fd', color: 'white' } : null}>M</button>
                        <button 
                        onClick={() => { forceRender(); data.size = 'l' }} 
                        style={data.size === 'l' ? { backgroundColor: '#9700fd', color: 'white' } : null}>L</button>
                    </div>
                    <div className="header--animation">
                        <p>Animations</p>
                        <select value={data.animation} onChange={e => { forceRender(); data.animation = e.target.value }}>
                            <option value="Fortine">Fortine wheel</option>
                            <option value="Animation">Animation</option>
                        </select>
                        <select value={data.time} onChange={e => { forceRender(); data.time = e.target.value }}>
                            <option value={2}>Auto 2 sec</option>
                            <option value={5}>Auto 5 sec</option>
                            <option value={10}>Auto 10 sec</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="settings--body">
                <div className="body-add">
                    Tiles
                    <div className="container--add"><button onClick={() => { data.tiles.push(newTile); forceRender() }}>
                    <div className="plus">+</div>Add Tile</button></div>
                </div>
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