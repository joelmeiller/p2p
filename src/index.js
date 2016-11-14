/* eslint-disable no-undef */
// node imports
import 'babel-polyfill';

// React imports
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Local imports
import configureStore from './store/configureStore.js';

// Routes
import routes from './ui/root/routes.jsx';

// Load CSS styles
import './ui/styles/import.css';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Configure store & history
const store = configureStore();

ReactDOM.render(
  routes(store)
, document.getElementById('react-root'));
