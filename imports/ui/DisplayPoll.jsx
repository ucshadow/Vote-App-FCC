import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

import { VoteData } from '../api/voteData.js';
import assignColor from '../api/assignColor.js';
import ToD3 from './ToD3.jsx';


// TODO MAP TO CLASS !!
// mapped to Class but the issue was a > instead of a >= ...

export default class DisplayPoll extends React.Component {

  constructor(){
    super();

    this.mapSingleton = this.mapSingleton.bind(this);
  }

  mapSingleton() {
    return [this.props.data].map((d) => {
      return <Singleton key={Math.random()} data={d} />
    })
  }

  render() {
    return (
      <div>
        {this.mapSingleton()}
      </div>
    )
  }
}


class Singleton extends React.Component {

  constructor() {
    super();

    if(!localStorage.p) {
      localStorage.setItem("p", "[]")
    }

    this.state = {voted: (JSON.parse(localStorage.p).indexOf(window.location.pathname) >= 0)};
    this.hasVoted = this.hasVoted.bind(this);
    this.totalVotes = this.totalVotes.bind(this);
    this.trimText = this.trimText.bind(this);
    this.mEnter = this.mEnter.bind(this);
    this.mLeave = this.mLeave.bind(this);
  }

  checkOPT() {
    return document.querySelector('input[name="opt"]:checked')
  }

  hasVoted(){
    this.setState({voted: true});
  }

  voteFor(ID, opt, event) {
    let l = JSON.parse(localStorage.p);
    if(opt){
      if(l.indexOf(window.location.pathname) < 0) {
        l.push(window.location.pathname);
        localStorage.setItem("p", JSON.stringify(l));
        console.log(localStorage.p);
        const allOptions = VoteData.findOne({_id: ID}).options;
        for(let i = 0; i < allOptions.length; i++){
          if(allOptions[i][0] === opt){
            allOptions[i][1] += 1;
            Meteor.call('voteData.update', this.props.data._id, allOptions);
          }
        }
        this.hasVoted();
      } else {
        $("#alerts").text("PICK ONE!");
      }
    } else {
      $("#alerts").text(this.state.voted ? "already voted" : "pick one");
    }
  }

  totalVotes() {
    let total = 0;
    for(let i = 0; i < this.props.data.options.length; i++) {
      total += this.props.data.options[i][1]
    }
    return total;
  }

  trimText(t) {
    let toList = t.split(" ");
    if(toList[0].length > 20) {
      return toList[0].substring(0, 20)
    }
    else if(toList.length > 3) {
      let res = "";
      for(let x = 0; x < 3; x ++) {
        res += toList[x] + " ";
      }
      return res;
    }
    else {
      return t;
    }
  }

  mEnter(t) {
    let toList = t.split(" ");
    if(toList[0].length > 20 || toList.length > 3) {
      $("#alerts").text(t);
    }
  }

  mLeave() {
    $("#alerts").text("");
  }

  render() {
    return (
      <div className="display-poll">
        <div className="a-poll-by">
          A poll by
          <span style={{color: "#EA2E49"}}> {this.props.data.author}
          </span>
        </div>
        <h2> {this.props.data.title} </h2>
        <div className="some-other-container">
          {this.props.data.options.map((option) => {
            return (
              <div className="row poll-options" key={option[0] + '-' + Math.random()}>

                <div className="o-txt"
                onMouseEnter={() => this.mEnter(option[0])} onMouseLeave={() => this.mLeave(option[0])}
                >{this.trimText(option[0])}</div>
                <div className="percentage">{
                  this.state.voted ? (option[1] * 100 / this.totalVotes()).toString().split(".")[0] + "%" : ""
                  }</div>
                <div className="empty-bar"> &#8195; </div>

                {this.state.voted === false
                  ?
                  <div>
                  <input type="radio" name="opt" id={option[0]} value={option[0]}
                    className="col-sm-1 click-to-vote"  />
                    </div>
                  :
                <div></div>}
                  <div className="vote-option" style={{
                  background:
                    (this.state.voted ? assignColor(this.props.data.options.indexOf(option)) : "#484D61"),
                  width: (this.state.voted ? ((option[1] * 100 / this.totalVotes()).toString() + "%") : "100%" )}}>
                    &#8195;
                  </div>
              </div>
              )
            })}
        </div>
        <br />
        <div className="edit-button">
          { this.state.voted ? <div> </div> :
            <button className="btn-primary" onClick={ () => this.voteFor(this.props.data._id,
              this.checkOPT() ? this.checkOPT().value : null) }>
              Submit
            </button>
          }
          <Link to={"/edit/" + this.props.data.queryID}>
            <button className="btn-success" style={{"float": "right"}}> Edit
            </button>
          </Link>
        </div>
        <ToD3 key={Math.random()} d={this.props.data} />
        <br />
        <div id="alerts" className="alerts"></div>
      </div>
    )
  }

}