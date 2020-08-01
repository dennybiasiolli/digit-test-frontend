import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Configuration } from "@react-md/layout";
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';


// the ConfigurationProps are just all the props for the providers
// joined together. The only difference is that onResize has been
// renamed to onAppResize for the AppSizeListener
const overrides = {
  // your configuration overrides
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Configuration {...overrides}>
        <App />
      </Configuration>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
