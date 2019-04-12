import React, { useState, createContext } from 'react';

import { Query } from 'react-apollo';
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