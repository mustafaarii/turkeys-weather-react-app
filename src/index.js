import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'rsuite/dist/styles/rsuite-default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

