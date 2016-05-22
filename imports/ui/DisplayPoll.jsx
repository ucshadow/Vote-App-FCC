import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

import { VoteData } from '../api/voteData.js';
import ToD3 from './ToD3.jsx';


export default class DisplayPoll extends React.Component {

  constructor(props){
    super(props);
    this.state = {voted: false};
  }

  checkOPT() {
    return document.querySelector('input[name="opt"]:checked')
  }

  voteFor(ID, opt, event) {
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
  }

  editPoll() {

  }

  render() {
    return (
      <div>
        <h1> {this.props.data.author} </h1>
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
                <div> YOU ALREADY VOTED! </div>}

                <div className="col-sm-4 vote-option"> {option[0]}: {option[1]} </div>

              </div>
              )
            })}
        </div>
        <button onClick={ () => this.voteFor(this.props.data._id,
        this.checkOPT() ? this.checkOPT().value : null) }>
          Submit </button>
        <div>
          <Link to={"/edit/" + this.props.data.queryID}> Edit </Link>
        </div>
        <ToD3 key={Math.random()} d={this.props.data} />
      </div>
    )
  }
}