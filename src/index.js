// import 'framework7/dist/css/framework7.ios.min.css';
// import 'framework7/dist/css/framework7.ios.colors.min.css';

 // OR for Material Theme:
import 'framework7/dist/css/framework7.material.min.css'
import 'framework7/dist/css/framework7.material.colors.min.css'


import './css/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import {Provider} from 'react-redux';
import {store} from './store';


document.addEventListener("deviceready", () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}, false);



