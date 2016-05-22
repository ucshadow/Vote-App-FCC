import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import { VoteData } from '../imports/api/voteData.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import About from '../imports/ui/About.jsx';
import Create from '../imports/ui/Create.jsx';
import { NotFound } from '../imports/ui/NotFound.js';
import Poll from '../imports/ui/Poll.jsx';
import EditPoll from '../imports/ui/EditPoll.jsx';
import MyPolls from '../imports/ui/MyPolls.jsx';


export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="about" component={ About } />
      <Route path="create" component={ Create } />
      <Route path="myPolls" component={ MyPolls } />
      <Route path="polls/:pollID" component={ Poll } />
      <Route path="edit/:pollID" component={ EditPoll } />
      <Route path="*" component={ NotFound } />

    </Route>
  </Router>
);


Meteor.startup(() => {

  Meteor.subscribe('voteData', {
    onReady: function(){
      if(VoteData.find().fetch().length === 0){
        Meteor.call('voteData.insert', {
          author: "admin",
          options: [ ["Winter", 0], ["Spring", 0], ["Summer", 0], ["Autumn", 0] ],
          createdAt: new Date(),
          title: "Best Season",
          pollType: "firstPage",
          queryID: Math.random().toString().substring(2, 17)})
      }
      console.log(VoteData.find().fetch())
    }
  });

  render(renderRoutes(), document.getElementById('app'));


});


