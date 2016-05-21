import React from 'react'
import { render } from 'react-dom'


class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rows: ["1-row-option", "2-row-option"]};
    this.addRowOptions = this.addRowOptions.bind(this);
    this.addOptionRow = this.addOptionRow.bind(this);
    this.submitPoll = this.submitPoll.bind(this);
  }

  addRowOptions() {
    return this.state.rows.map((row) => {
      return (
        <div className="input-group input-group-lg" key={row}>
          <span className="input-group-addon">Option {row.substring(0, 1)}</span>
          <input type="text" className="form-control" placeholder={"Option " + row.substring(0, 1)} id={row}/>
        </div>
      )
    })
  }

  addOptionRow() {
    let currentState = this.state.rows;
    currentState.push(currentState.length + 1 + "-row-option");
    this.setState({rows: currentState});
  }

  submitPoll() {
    let all = this.state.rows;
    let pollObject = {options: []};
    for(let i = 0; i < all.length; i++){
      let opt = document.getElementById(all[i]).value;
      pollObject.options.push(opt)
    }
    pollObject.title = document.getElementById("poll-title").value;
    console.log(pollObject);
  }

  render() {
    return (
      <div>
        Hi from Create
        <div className="create-container col-lg-6">
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="pollTitle">Title</span>
            <input type="text" className="form-control" placeholder="Title" id="poll-title"/>
          </div>
          {this.addRowOptions()}
        </div>
        <button onClick={this.addOptionRow}> Add Row </button>
        <button onClick={this.submitPoll}> Submit </button>
      </div>
    )
  }
}

export default Create;