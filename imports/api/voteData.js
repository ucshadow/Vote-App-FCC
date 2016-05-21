import { Mongo } from 'meteor/mongo';

export const VoteData = new Mongo.Collection('voteData');


//
// {author: "admin", options: [ ["Winter", 0], ["Spring", 0], ["Summer", 0], ["Autumn", 0] ], createdAt: new Date(), title: "Best Season"}
//

