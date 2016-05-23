import React from 'react'
import { render } from 'react-dom'

import { Link } from 'react-router'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


export default class App extends React.Component {

  render() {
    return (
      <div>
        <Link to="/about"> About </Link>
        <Link to="/create"> Add Poll </Link>
        <Link to="/"> Home </Link>
        <Link to="/myPolls"> My Polls </Link>
        <Link to="/browsePolls"> Browse Polls </Link>
        <AccountsUIWrapper />
        {this.props.children}
      </div>
    )
  }
}