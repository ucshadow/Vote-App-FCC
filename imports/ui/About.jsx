import React from 'react'
import { render } from 'react-dom'


export default class About extends React.Component {

  render() {
    return (
      <div>
        <h2> A site made by Catalin for freecodecamp.com challenge "Build A Voting App"</h2>
        <br />
        Used in making of this:
        <br />

        <div className="media">
          <div className="media-left">
            <a href="https://www.meteor.com/">
              <img className="media-object logo" src="meteor-icon.svg" title="Meteor" />
            </a>
          </div>


          <div className="media-left">
            <a href="https://www.mongodb.com/">
              <img className="media-object logo" src="mongo.png" title="MongoDB" />
            </a>
          </div>


          <div className="media-left">
            <a href="https://facebook.github.io/react/">
              <img className="media-object logo" src="react.png" title="React" />
            </a>
          </div>


          <div className="media-left">
            <a href="https://github.com/reactjs/react-router">
              <img className="media-object logo" src="react-r.png" title="React Router" />
            </a>
          </div>


          <div className="media-left">
            <a href="https://d3js.org/">
              <img className="media-object logo" src="d3.png" title="D3" />
            </a>
          </div>


          <div className="media-left">
            <a href="http://getbootstrap.com/">
              <img className="media-object logo" src="bootstrap.png" title="Bootstrap" />
            </a>
          </div>
        </div>

        <a href="https://github.com/ucshadow/Vote-App-FCC"><h1> Source Code </h1> </a>

        <h3 style={{position: "absolute", bottom: "1em"}}>
          The app is using localStorage to keep track of votes, so it has no IP tracking.
        </h3>


      </div>
    )
  }
}