import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import Router from '../routes';

const App = props => (
    <Provider store={props.store}>
        <Router />
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
