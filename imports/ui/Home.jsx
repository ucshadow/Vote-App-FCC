import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom'

import { VoteData } from '../api/voteData.js';
import DisplayPoll from './DisplayPoll.jsx';


class Home extends Component {

  activateDisplayPoll(){
    return VoteData.find({"pollType": "firstPage"}).fetch().map((xx) => {
      return <DisplayPoll key={xx._id} data={xx} />
    })
  }

  render() {
    return (
      <div>
        {this.activateDisplayPoll()}
      </div>
    )
  }
}


Home.propTypes = {
  voteData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('voteData');
  return {
    voteData: VoteData.find({}).fetch()
  };
}, Home);