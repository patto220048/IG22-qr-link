import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './base/_gobal.scss';    
// react query
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
//redux-toolkit
import { store } from './redux-toolkit/store.js';
import { Provider } from 'react-redux';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store} >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
);
