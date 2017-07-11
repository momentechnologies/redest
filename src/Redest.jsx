import React from 'react';
import { connect } from 'react-redux';
import { select, selectOne } from './selectors';
import restAction from './actions';

export default (WrappedComponent, dataToRetrieve) => {
    class hoc extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentWillMount() {
            this.check();
        }
        componentWillUpdate() {
            this.check();
        }
        check() {
            dataToRetrieve.forEach((endpoint) => {
                const endpointInfo = this.props['_' + endpoint.reducer];
                const actions = restAction(endpointInfo.prefix, endpointInfo.baseUrl);
                if (endpoint.id) {
                    this.props.dispatch(actions.getIfNeeded(endpoint.id));
                } else {
                    this.props.dispatch(actions.getAllIfNeeded(endpoint.filter));
                }

            });
        }
        render() {
            return (<WrappedComponent {...this.props}/>);
        }
    }

    hoc.propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    return connect(
        (state) => {
            let props = {};
            dataToRetrieve.forEach((reducer) => {
                props['_' + reducer.reducer] = {
                    prefix: state[reducer.reducer].prefix,
                    baseUrl: state[reducer.reducer].baseUrl
                };
                let propName = reducer.reducer;
                if (reducer.propName) propName = reducer.propName;
                if (reducer.id) {
                    props[propName] = selectOne(state[reducer.reducer], reducer.id);
                } else {
                    props[propName] = select(state[reducer.reducer], reducer.filter);
                }
            });
            return props;
        }
    )(hoc)
}