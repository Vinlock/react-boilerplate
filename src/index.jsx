import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './fonts.scss';
import AppProvider from './AppProvider';
import './fontAwesome';
import registerServiceWorker from './registerServiceWorker';

// ReactGA.initialize(process.env.REACT_APP_GA);
// ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<AppProvider />, document.getElementById('root'));
registerServiceWorker();
