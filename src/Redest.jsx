import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { select, selectOne } from './selectors';
import restAction from './actions';

const internalPropPrefix = '__redest__';

const loopDataToRetrive = (dataToRetrieve, callback) => {
    dataToRetrieve.forEach((dataToRetrieve) => {
        callback(dataToRetrieve.reducer, internalPropPrefix + dataToRetrieve.reducer, dataToRetrieve);
    });
};

const buildActions = (dataToRetrieve, props) => {
    let actions = {};
    loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        const endpointInfo = props[propReducer];
        const restActions = restAction(endpointInfo.prefix, endpointInfo.baseUrl);
        Object.keys(restActions).forEach((actionName) => {
            actions[dataToRetrieve.reducer + '_' + actionName] = (...args) => props.dispatch(restActions[actionName](...args))
        });
    });
    return actions;
};

const buildProps = (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        newProps[propReducer] = {
            prefix: state[reducer].prefix,
            baseUrl: state[reducer].baseUrl
        };
        let propName = reducer;
        if (dataToRetrieve.propName) propName = dataToRetrieve.propName;
        const filter = dataToRetrieve.select(props);
        if (filter && typeof filter === 'object') {
            newProps[propName] = select(state[reducer], filter);
        } else if (filter === 'all') {
            newProps[propName] = select(state[reducer]);
        } else if (filter) {
            newProps[propName] = selectOne(state[reducer], filter);
        }
    });
    return newProps;
};

const buildPropsForComponent = (dataToRetrieve, props) => {
    let newProps = {};

    Object.keys(props).forEach((propKey) => {
        if (!propKey.startsWith(internalPropPrefix)) {
            newProps[propKey] = props[propKey];
        }
    });

    return {
        ...newProps,
        ...buildActions(dataToRetrieve, props)
    }
};

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
            loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
                const endpointInfo = this.props[propReducer];
                const actions = restAction(endpointInfo.prefix, endpointInfo.baseUrl);
                const filter = dataToRetrieve.select(this.props);
                if (filter && typeof filter === 'object') {
                    this.props.dispatch(actions.getAllIfNeeded(filter));
                } else if (filter === 'all') {
                    this.props.dispatch(actions.getAllIfNeeded(null));
                } else if (filter) {
                    this.props.dispatch(actions.getIfNeeded(filter));
                }
            });
        }
        render() {
            return (<WrappedComponent {...buildPropsForComponent(dataToRetrieve, this.props)}/>);
        }
    }

    hoc.propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    return connect((state, ownProps) => buildProps(dataToRetrieve, state, ownProps))(hoc);
}