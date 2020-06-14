import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Category from './Category';
//import Home from './Home';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//import AppNav from './AppNav';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//

//      AppNav
//          |
//          v
//      Home.js Category.js Expenses.js
//          |
//          v
//          App.js
//          |
//          v
//          index.js
