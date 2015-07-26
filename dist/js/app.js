import React from 'react';
import Router, { Route } from 'react-router';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ThemeManager from './services/ThemeManager';
import RouterContainer from './services/RouterContainer';
import App from './components/App';
import Home from './components/Home';

require('../css/main.scss');

injectTapEventPlugin();

let routes = (
  <Route handler={App}>
    <Route name='home' path='/' handler={Home} />
  </Route>
);

let router = Router.create({routes});
RouterContainer.set(router);

let theme_manager = new mui.Styles.ThemeManager();
theme_manager.setTheme(theme_manager.types.LIGHT);
ThemeManager.set(theme_manager);

router.run(function (Handler) {
  React.render(<Handler />, document.body);
});
