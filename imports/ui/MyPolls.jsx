import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { VoteData } from '../api/voteData.js';


class MyPolls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {allMyPolls: [0]};

    this.isLogged = this.isLogged.bind(this);
    this.performance = this.performance.bind(this);
  }

  isLogged(){
    return VoteData.find({author: Meteor.user().username}).fetch().map((poll) => {
      return (
        <UserCheck key={Math.random()} d={poll} />
      )
    })
  }

  performance() {
    return this.state.allMyPolls.map(() => {
      return <Performance key={Math.random()} d={VoteData.find({author: Meteor.user().username}).fetch()} />
    })
  }

  render() {
    return (
      <div>
        {Meteor.user() ? this.isLogged() : "Please Log In to see your polls"}
        {Meteor.user() ? this.performance() : " "}
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


class UserCheck extends React.Component {

  constructor() {
    super();
    this.deletePoll = this.deletePoll.bind(this);
  }

  deletePoll(target) {
    Meteor.call('voteData.delete', target)
  }

  render() {
    return (
      <div>
        <div className="list-group all-polls">
          <a href={window.location.origin + "/polls/" + this.props.d.queryID}>
            <button className="list-group-item">
              <span className="poll-title">{this.props.d.title}</span>

            </button>
          </a>

        </div>
        <div className="delete-poll" onClick={() => this.deletePoll(this.props.d.queryID)} > Delete </div>
      </div>
    )
  }

}

class Performance extends React.Component {

  constructor(props) {
    super(props);
    this.performance = this.performance.bind(this);
  }

  performance(){
    let data = this.props.d;
    let total = 0;
    for(let i = 0; i < data.length; i ++) {
      let per = 0;
      for(let x = 0; x < data[i].options.length; x++) {
        per += data[i].options[x][1]
      }
      total += per;
    }
    return total;
  }

  render() {
    return (
      <div>
        <h1> Total votes on all your polls: {this.performance()} </h1>
      </div>
    )
  }

}