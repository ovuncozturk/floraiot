import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ReactRouterApp from '../imports/ui/ReactRouterApp.jsx';


Meteor.startup(() => {
  render(<ReactRouterApp />, document.getElementById('render-target'));
});
