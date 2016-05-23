import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { VoteData } from '../api/voteData.js';


export default class BrowsePolls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {allMyPolls: [0]};

    this.getAll = this.getAll.bind(this);
  }

  getAll(){
    return VoteData.find({}).fetch().map((poll) => {
      return (
        <DisplayAll key={Math.random()} d={poll} />
      )
    })
  }

  render() {
    return (
      <div>
        {Meteor.user() ? this.getAll() : "Fetching polls..."}
      </div>
    )
  }

}


BrowsePolls.propTypes = {
  pollID: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('voteData');
  return {
    voteData: VoteData.find({}).fetch()
  };
}, BrowsePolls);

class DisplayAll extends React.Component {

  render() {
    return (
      <div>
        <a href={window.location.origin + "/polls/" + this.props.d.queryID}> {this.props.d.title + " "}
        </a> by {this.props.d.author}
      </div>
    )
  }

}