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
                id: { type: new GraphQLNonNull(GraphQLString) }
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

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //mutation for adding new title
        addTitle: {
            type: TitleType,
            args: {
                subHeader: { type: new GraphQLNonNull(GraphQLString) },
                heading: { type: new GraphQLNonNull(GraphQLString) },
                positive: { type: new GraphQLNonNull(GraphQLBoolean) },
                background: { type: new GraphQLNonNull(GraphQLString) },
                btnText: { type: GraphQLString },
                btnLink: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axious.post(endPoint, {
                    subHeader: args.subHeader,
                    heading: args.heading,
                    positive: args.positive,
                    background: args.background,
                    btnText: args.btnText,
                    btnLink: args.btnLink
                })
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        //mutation for editing titles
        editTitle: {
            type: TitleType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                subHeader: { type: GraphQLString },
                heading: { type: GraphQLString },
                positive: { type: GraphQLBoolean },
                background: { type: GraphQLString },
                btnText: { type: GraphQLString },
                btnLink: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axious.patch(`${endPoint}/${args.id}`, args)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});