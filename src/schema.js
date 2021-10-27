const { gql } = require('apollo-server');

const typeDefs = gql`
"Get Tracks array for homepage grid"
type Query{
    TracksForHome: [Track!]!
    Track(id: ID!): Track
    module(id: ID!): Module
}

type Mutation{
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse
}

type IncrementTrackViewsResponse{
    "Similar to Http status code, but represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was succesful or not (True/False)"
    success: Boolean!
    "Human-readable message for UI"
    message: String!
    "Track updating response (if any)"
    track: Track
}

"Track: Group Modules that teaches about specifgic topic"
type Track{
    id: ID!
    title: String!
    author: Author!
    "This is the image url for the Track"
    thumbnail: String
    "Length of the Track in minutes"
    length: Int
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    modules: [Module!]!
}

"Author of a complete Track"
type Author{
    id: ID!
    name: String!
    photo: String
}

"A Module is a single unit of teaching. Multiple Modules compose a Track"
type Module {
    id: ID!
    "The module's title"
    title: String!
    "The module's length in minutes"
    length: Int
    "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
    content: String
    "The module's video url, for video-based modules"
    videoUrl: String
}
`;

module.exports = typeDefs;