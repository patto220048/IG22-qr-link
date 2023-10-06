import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './base/_gobal.scss';
//redux-toolkit
import { store } from './redux-toolkit/store.js';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
