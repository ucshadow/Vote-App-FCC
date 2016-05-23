import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

import { VoteData } from '../api/voteData.js';
import assignColor from '../api/assignColor.js';
import ToD3 from './ToD3.jsx';


export default class DisplayPoll extends React.Component {

  constructor(props){
    super(props);

    if(!localStorage.p) {
      localStorage.setItem("p", "[]")
    }

    this.state = {voted: (JSON.parse(localStorage.p).indexOf(window.location.pathname) > 0)};
    this.hasVoted = this.hasVoted.bind(this);
    this.totalVotes = this.totalVotes.bind(this);
  }

  checkOPT() {
    return document.querySelector('input[name="opt"]:checked')
  }

  hasVoted(){
    this.setState({voted: true});
  }

  voteFor(ID, opt, event) {


    let l = JSON.parse(localStorage.p);

    if(l.indexOf(window.location.pathname) < 0){
      l.push(window.location.pathname);
      localStorage.setItem("p", JSON.stringify(l));
      console.log(localStorage.p);
      if(opt){
        //this.changeState();
        const allOptions = VoteData.findOne({_id: ID}).options;
        for(let i = 0; i < allOptions.length; i++){
          if(allOptions[i][0] === opt){
            allOptions[i][1] += 1;
            Meteor.call('voteData.update', this.props.data._id, allOptions);
          }
        }
      } else {
        console.log('pick one!')
      }
      this.hasVoted();
    } else {
      console.log("already voted");
      this.hasVoted();
    }
  }

  totalVotes() {
    let total = 0;
    for(let i = 0; i < this.props.data.options.length; i++) {
      total += this.props.data.options[i][1]
    }
    return total;
  }

  render() {
    console.log(this.state.voted);
    return (
      <div className="display-poll">
        <h1>A poll by {this.props.data.author} </h1>
        <h2> {this.props.data.title} </h2>

        <div>
          {this.props.data.options.map((option) => {
            return (
              <div className="row poll-options" key={option[0] + '-' + Math.random()}>

                {this.state.voted === false
                  ?
                  <div>
                  <input type="radio" name="opt" id={option[0]} value={option[0]}
                    className="col-sm-1 click-to-vote"  />
                    </div>
                  :
                <div></div>}
                  <div className="vote-option" style={{background:
                    (this.state.voted ? assignColor(this.props.data.options.indexOf(option)) :
                    "#085380")}}> {option[0]}
                  </div>
              </div>
              )
            })}
        </div>
        <button onClick={ () => this.voteFor(this.props.data._id,
        this.checkOPT() ? this.checkOPT().value : null) }>
          Submit </button>
        <div className="edit-button">
          <Link to={"/edit/" + this.props.data.queryID}> Edit </Link>
        </div>
        <ToD3 key={Math.random()} d={this.props.data} />
      </div>
    )
  }
}