import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { VoteData } from '../api/voteData.js';
import DisplayPoll from './DisplayPoll.jsx';


export default class Poll extends React.Component {

  constructor(props){
    super(props);
    this.activateDisplayPoll = this.activateDisplayPoll.bind(this);
  }

  activateDisplayPoll(){
    return VoteData.find({"queryID": this.props.params.pollID}).fetch().map((xx) => {
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


Poll.propTypes = {
  pollID: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('voteData');
  return {
    voteData: VoteData.find({}).fetch()
  };
}, Poll);