import React, { Fragment, useState } from 'react';
// import Reorder, { reorder } from 'react-reorder';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';


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
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

const Tile = ({ subheader, ...props }) => {

    const [slider, setSlider] = useState(true);


    return (
        <div className="tile">
            <div className="subheader">
                <div className="dnd"></div>
                <input type="text" value={subheader} />
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
    )
}

const Settings = ({ toggle }) => {

    // const [tile, setTile] = useState(["Photo", "Nature", "Car"]);


    // const order = (event, previusIndex, nextIndex) => {
    //     event.preventDefault();
    //     setTile(() => reorder(tile, previusIndex, nextIndex));
    // }

    return (
        <ApolloProvider client={client}>
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
                        <Query query={TILES_QUERY}>
                            {
                                ({ loading, error, data }) => {
                                    if (loading) return <h4>Loading</h4>
                                    if (error) console.log(error)
                                    console.log(data);
                                    return(  
                                    <Fragment>
                                        {
                                            data.tiles.map(tile => (
                                                <div className="list" key={tile.id}>
                                                    <Tile
                                                        subheader={tile.subHeader}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Fragment>
                                    )
                                }
                            }
                        </Query>
                    </div>
                </div>
                <div className="settings--footer">
                    <button>SAVE</button>
                </div>
            </div>
        </ApolloProvider>
    )
}

export default Settings;