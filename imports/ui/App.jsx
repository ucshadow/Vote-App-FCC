import React from 'react'
import { render } from 'react-dom'

import { Link } from 'react-router'


export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/create">Add Poll</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}