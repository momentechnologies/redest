import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './stores/createStore';

const store = createStore();
const root = document.getElementById('root');

ReactDOM.render(<App store={store} />, root);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ReactDOM.render(<NextApp store={store} />, root);
    });
}

registerServiceWorker();
