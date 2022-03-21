import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ViewStateProvider from './uicomponents/ViewState/ViewStateContext';

import { defaultPage } from './constants/pages';




ReactDOM.render(
  <React.StrictMode>
    <ViewStateProvider initialViewState={defaultPage}>
        <App />
    </ViewStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
