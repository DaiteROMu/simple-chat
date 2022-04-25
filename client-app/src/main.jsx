import React from 'react';
import ReactDOM from 'react-dom/client';

import { CurrentUserProvider } from './CurrentUserContext';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CurrentUserProvider>
            <App />
        </CurrentUserProvider>
    </React.StrictMode>
);
