import React, { Fragment, useState } from 'react';
import Tile from './tile';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
// import Tile from './tile';

// const TILES_QUERY = gql`
//     query TilesQuery{
//         tiles {
//             id
//             subHeader
//             heading
//             positive
//             background
//   }
// }
// `;


// const Tiles = ({ save }) => {

//     console.log(save);

//     return (
//         <Query query={TILES_QUERY}>
//             {
//                 ({ loading, error, data }) => {
//                     if (loading) return <h4>Loading . . .</h4>;
//                     if (error) console.log(error);
//                     console.log(data);

//                     return (
//                         <Fragment>
//                             {
//                                 data.tiles.map(tile => (
//                                     <Tile data={tile} key={tile.id}/>
//                                 ))
//                             }
//                         </Fragment>
//                     )
//                 }
//             }
//         </Query>
//     );
// }

const Settings = ({ toggle, data }) => {

    const [state, setState] = useState(data.tiles);

    console.log(state);

    const newTile = {
        subHeader: "",
        heading: "",
        positive: false,
        background: ""
    };

    const renderTiles = () => {
        return data.tiles.map(item => {
            data.increment++;
            return (
                <Tile key={data.increment} data={item} />
            )
        }
        )
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
                <button onClick={() => { data.tiles.push(newTile); setState({state: data.tiles}) }}>Add</button>
                <div className="body--tiles">
                    <p>SUBHEADER</p><p>HEADING</p><p>POSITIVE</p><p>BACKGROUND</p>
                    <div className="list">
                        {renderTiles()}
                    </div>
                </div>
            </div>
            <div className="settings--footer">
                <button type="submit">SAVE</button>
            </div>
        </div>
    )
}

export default Settings;