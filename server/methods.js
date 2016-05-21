import { VoteData } from '../imports/api/voteData.js'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'voteData.update'(elementId, value) {

    VoteData.update(elementId, {
      $set: {options: value}
    })

  },

  'voteData.insert'(value) {
    VoteData.insert(value)
  }

});