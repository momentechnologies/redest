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
        if (dataToRetrieve.id) {
            newProps[propName] = selectOne(state[reducer], dataToRetrieve.id(props));
        } else {
            newProps[propName] = select(state[reducer], dataToRetrieve.filter(props));
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
                if (dataToRetrieve.id) {
                    this.props.dispatch(actions.getIfNeeded(dataToRetrieve.id(this.props)));
                } else {
                    this.props.dispatch(actions.getAllIfNeeded(dataToRetrieve.filter(this.props)));
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