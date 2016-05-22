import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { VoteData } from '../api/voteData.js';


class MyPolls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {allMyPolls: []};

    this.isLogged = this.isLogged.bind(this);
  }

  isLogged(){
    return VoteData.find({author: Meteor.user().username}).fetch().map((poll) => {
      return (
        <Test key={Math.random()} d={poll} />
      )
    })
  }

  render() {
    return (
      <div>
        {Meteor.user() ? this.isLogged() : "Please Log In to see your polls"}
      </div>
    )
  }

}


MyPolls.propTypes = {
  pollID: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('voteData');
  return {
    voteData: VoteData.find({}).fetch()
  };
}, MyPolls);


class Test extends React.Component {

  render() {
    return (
      <div>
        {this.props.d.title} -> {window.location.origin + "/polls/" + this.props.d.queryID}
      </div>
    )
  }

}