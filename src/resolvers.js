const resolvers = {
    Query: {
        //Return an array of Tracks that will be used to populate
        //the homepage
        TracksForHome: (_, __, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        },
        //Get a single track by Id
        Track: (_, { id }, {dataSources}) => {
            return dataSources.trackAPI.getTrack(id);
        },
        module: (_, { id }, { dataSources }) => {
            return dataSources.trackAPI.getModule(id);
        }
    },
    Mutation: {
        //Increment's Track NumberOfViews field
        incrementTrackViews: async (_, { id }, { dataSources }) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented the number of views`,
                    track
                }
            } catch (error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    track: null
                }
            }
        }
    },
    Track: {
        author: ({authorId}, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId);
         },
         modules: ({ id }, _, { dataSources }) => {
             return dataSources.trackAPI.getTrackModules(id);
        },
        durationInSeconds: ({length}) => length
    },
    Module: {
        durationInSeconds: ({length}) => length
    }
};
module.exports = resolvers;