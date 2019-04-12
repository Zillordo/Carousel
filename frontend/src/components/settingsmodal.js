import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Tile from './tile';

const TILES_QUERY = gql`
    query TilesQuery{
        tiles {
            id
            subHeader
            heading
            positive
            background
  }
}
`;


const Tiles = ({save}) => {

    console.log(save);

    return (
        <Query query={TILES_QUERY}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <h4>Loading . . .</h4>;
                    if (error) console.log(error);
                    console.log(data);

                    return (
                        <Fragment>
                            {
                                data.tiles.map(tile => (
                                    <Tile
                                        key={tile.id}
                                        subheader={tile.subHeader}
                                        heading={tile.heading}
                                        positive={tile.positive}
                                    />
                                ))
                            }
                        </Fragment>
                    )
                }
            }
        </Query>
    );
}

const Settings = ({ toggle }) => {

    const [save, setSave] = useState(false);

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
                    <div className="list">
                        <Tiles save={save} />
                    </div>
                </div>
            </div>
            <div className="settings--footer">
                <button type="submit" onClick={()=>setSave(true)}>SAVE</button>
            </div>
        </div>
    )
}

export default Settings;