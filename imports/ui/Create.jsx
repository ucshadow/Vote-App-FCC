import React from 'react'
import { render } from 'react-dom'
import { withRouter } from 'react-router'


class Create extends React.Component {

  //  I used this for both Create and Edit, so there are a lot of conditional statements
  //  Like arg1 ? arg2 : arg3 to toggle between the 2

  constructor(props) {
    super(props);

    this.state = {rows: this.purpose(), showURL: null, u: [Meteor.user()]}; // old getInitialState()

    // bind all functions to the class Scope (I think this should be done for class --> extends)
    // because this way does not bind the functions to the Class scope like with React.createClass({})
    this.addRowOptions = this.addRowOptions.bind(this);
    this.addOptionRow = this.addOptionRow.bind(this);
    this.submitPoll = this.submitPoll.bind(this);
    this.showURL = this.showURL.bind(this);
    this.purpose = this.purpose.bind(this);
    this.getValue = this.getValue.bind(this);
    this.logS = this.logS.bind(this)
  }

  purpose(){
    // checks to see who called the Component? Edit or Create
    let x = this.props.d;
    let rows = [];
    if(x){                   // Edit mode
      for(let i = 0; i < x.options.length; i++){
        // push all the options (in Edit mode) to state so they can be mapped to inputs
        rows.push((i + 1) + "-row-option");
      }
    } else {                // Create mode
      rows = ["1-row-option", "2-row-option"];
      // add 2 rows (2 blank options)
      // the value of each row (ie "1-row-option") will be assigned to the input id
      // each should be unique and they will be queried for their values when Submit is clicked
    }
    return rows;
  }

  getValue(row){
    // sets the default Value of the input field. If Edit mode then it will set the value
    // corresponding to it's Poll.options counterpart
    let isThere = this.props.d.options[(row.length === 12 ? row.substring(0, 1) : row.substring(0, 2)) - 1];
    if(isThere){
      return isThere[0];
    } else {
      return null;
    }
  }

  addRowOptions() {
    // maps the rows list (found in state) and creates HTML input fields for each one
    // if Create mode it will create 2 empty
    // if Edit mode it will create input fields for each element in Poll.options
    return this.state.rows.map((row) => {
      let alias = (row.length === 12 ? row.substring(0, 1) : row.substring(0, 2));
      return (
        <div className="input-group input-group-lg" key={row}>
          <span className="input-group-addon">Option {alias}</span>
          <input type="text" className="form-control" placeholder={"Option " + alias} id={row}
          defaultValue={this.props.d ? this.getValue(row) : null}/>
        </div>
      )
    })
  }

  addOptionRow() {
    // adds an empty input field to the Poll (for more options)
    let currentState = this.state.rows;
    currentState.push(currentState.length + 1 + "-row-option");
    this.setState({rows: currentState});
  }

  submitPoll() {
    if(Meteor.user()){
      // read the requirements and it appears that you can't create a poll
      // as anonymous, so here is the check
      let author = (Meteor.user() ? Meteor.user().username : "anonymous");
      // Checks if logged
      let createdAt = new Date();
      let queryID = Math.random().toString().substring(2, 17);
      // assigns a random string that will be used as URL for the poll
      let all = this.state.rows;
      let pollObject = {options: []};
      for(let i = 0; i < all.length; i++){
        let opt = document.getElementById(all[i]).value;
        if(opt !== "") {
          pollObject.options.push([opt, 0])
        }
      }
      pollObject.title = document.getElementById("poll-title__").value;
      console.log(pollObject.title);
      pollObject.author = author;
      pollObject.createdAt = createdAt;
      pollObject.queryID = queryID;
      if(pollObject.title !== "" && pollObject.options.length >= 2){
        // Check if the Poll has at least a title and 2 options
        Meteor.call('voteData.insert', pollObject);
        if(this.props.d){
          // if Edit mode it will jump to the new Poll directly
          window.location.href = window.location.origin + "/polls/" + queryID;
        } else {
          // if Create mode it will show a message with the url to the new Poll
          // maybe this should jump to the poll directly too ? todo
          this.showURL([queryID]);
        }
      } else {
        $("#alerts").text('Give the Poll a title and at least 2 options');
      }
    } else {
      $("#alerts").text("Log in to create");
    }
  }

  showURL(url) {
    if(url){
      this.setState({showURL: url})
    }
  }

  logS() {
    console.log(this.state.u);
    return [Meteor.user()].map((x) => {
      return <Test key={Math.random()} d={x} />
    })
  }

  render() {
    return (
      <div>
        <div className="create-container col-lg-6">
          <div className="input-group input-group-lg"  id="poll-title">
            <span className="input-group-addon" id="pollTitle">Title</span>
            <input type="text" className="form-control" placeholder="Title" id="poll-title__"
            defaultValue={this.props.d ? this.props.d.title : null}/>
          </div>
          {this.addRowOptions()}
        </div>
        <div className="create-buttons">
          <button className="btn btn-primary btn-lg" onClick={this.addOptionRow}> Add Row </button>
          <button style={{"marginLeft": "5px"}}
            className="btn btn-success btn-lg" onClick={this.submitPoll}> Submit </button>
        </div>
        <br />
        <div>
          {this.state.showURL ? window.location.origin + "/polls/" + this.state.showURL : null}
        </div>
        <br />
        <div className="alerts" id="alerts"> </div>
      </div>
    )
  }
}

export default Create;

class Test extends React.Component {

  render() {
    return (
      <div> {(this.props.u ? this.props.u.username : "nonono")} </div>
    )
  }

}