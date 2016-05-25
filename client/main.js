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
import BrowsePolls from '../imports/ui/BrowsePolls.jsx';



export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="about" component={ About } />
      <Route path="create" component={ Create } />
      <Route path="myPolls" component={ MyPolls } />
      <Route path="browsePolls" component={ BrowsePolls } />
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
          options: [ ["Winter", 2], ["Spring", 4], ["Summer", 14], ["Autumn", 3] ],
          createdAt: new Date(),
          title: "Best Season",
          pollType: "firstPage",
          queryID: Math.random().toString().substring(2, 17)});
      }
      if(!VoteData.findOne({title: "Who is your favorite Disney Princess"})) {
        Meteor.call('voteData.insert', p1)
      }
      //console.log(VoteData.find().fetch())
    }
  });

  render(renderRoutes(), document.getElementById('app'));


});

Tracker.autorun(function(c) {
  // needed to make a trigger for login events because the Blaze template
  // is not interacting with React and so login and logout wont trigger anything
  // like a rerender of a React component.
  // ugly, but only triggers a refresh of the current page on login and logout.
  var userId = Meteor.userId();
  if (c.firstRun){
    return;
  }
  userId ? location.reload() : location.reload()
});

let p1 = {
  author: "SHADOW",
  options: [["Snow White", 12], ["Cinderella", 14], ["Aurora", 14], ["Ariel", 3],
  ["Belle", 5], ["Jasmine", 2], ["Pocahontas", 7], ["Mulan", 3],
  ["Tiana", 12], ["Rapunzel", 2], ["Merida", 1], ["Anna", 3]],
  createdAt: new Date(),
  title: "Who is your favorite Disney Princess",
  queryID: Math.random().toString().substring(2, 17)
};

let p2 = {
  author: "SHADOW",
  options: [["Sunday", 4], ["Monday", 14], ["Tuesday", 14], ["Wednesday", 8],
  ["Thursday", 5], ["Friday", 12], ["Saturday", 7]],
  createdAt: new Date(),
  title: "Best day of the week",
  queryID: Math.random().toString().substring(2, 17)
};

let p3 = {
  author: "SHADOW",
  options: [["Red", 14], ["Green", 1], ["Blue", 6], ["Yellow", 8],
  ["Pink", 12], ["Orange", 2], ["Brown", 4]],
  createdAt: new Date(),
  title: "Best color",
  queryID: Math.random().toString().substring(2, 17)
};

let p4 = {
  author: "SHADOW",
  options: [["Action", 51], ["Shooter", 23], ["Action-adventure", 60], ["Adventure", 17],
  ["Role-playing", 62], ["Simulation", 43], ["Sports", 31], ["Strategy", 19], ["Survival horror", 2], ["MMO", 76]],
  createdAt: new Date(),
  title: "Favorite game genre",
  queryID: Math.random().toString().substring(2, 17)
};

