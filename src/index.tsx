import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase';

import './styles/global.scss'

import {Provider} from 'react-redux'
import storeConfig from './store/storeConfig';

ReactDOM.render(
  <Provider store={storeConfig()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


