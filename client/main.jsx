import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ReactReduxLittleRouterApp from '../imports/ui/ReactReduxLittleRouterApp.jsx';


Meteor.startup(() => {
  render(<ReactReduxLittleRouterApp />, document.getElementById('render-target'));
});
