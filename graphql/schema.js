const axious = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');


//endpoint
const endPoint = 'http://localhost:8080/titles';

//Title type
const TitleType = new GraphQLObjectType({
    name: 'Title',
    fields: () => ({
        id: { type: GraphQLString },
        subHeader: { type: GraphQLString },
        heading: { type: GraphQLString },
        positive: { type: GraphQLBoolean },
        background: { type: GraphQLString },
        btnText: { type: GraphQLString },
        btnLink: { type: GraphQLString }
    })
});


//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //deleting
        deleteTitle: {
            type: TitleType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                //deleting data based on id using axious
                return axious.delete(`${endPoint}/${args.id}`)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        //retrieving
        titles: {
            type: new GraphQLList(TitleType),
            resolve(parentValue, args) {
                //retrieving data using axious
                return axious.get(endPoint)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery
});