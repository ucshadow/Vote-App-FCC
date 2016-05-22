import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { VoteData } from '../api/voteData.js';
import Create from './Create.jsx';


export default class EditPoll extends React.Component {

  constructor(props){
    super(props);
    this.Edit = this.Edit.bind(this);
  }

  Edit() {
    //let data = VoteData.find({queryID: this.props.params.pollID}).fetch();
    return VoteData.find({queryID: this.props.params.pollID}).fetch().map((d) => {
      return (
        <Create key={Math.random()} d={d} />
      )
    })
  }

  render() {
    return (
      <div>
        {this.Edit()}
      </div>
    )
  }
}


EditPoll.propTypes = {
  pollID: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('voteData');
  return {
    voteData: VoteData.find({}).fetch()
  };
}, EditPoll);