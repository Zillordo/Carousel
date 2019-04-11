import React from 'react';



const Tile = () => {


    return (
        <React.Fragment>
            <ul id="item-list" className="list">
                <ul className="tile">Tile1</ul>
            </ul>
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
                        <select></select>
                        <select></select>
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