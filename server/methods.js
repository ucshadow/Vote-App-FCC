import { VoteData } from '../imports/api/voteData.js'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'voteData.update'(elementId, value) {

    VoteData.update(elementId, {
      $set: {options: value}
    })

  },

  'voteData.insert'(value) {
    if(value.author && value.options) {
      VoteData.insert(value)
    }
  },

  'voteData.delete'(value) {
    let field = VoteData.findOne({queryID: value});
    if(field && field.author === Meteor.user().username){
      VoteData.remove({queryID: value})
    } else {
      console.log('gtfo')
    }
  }

});