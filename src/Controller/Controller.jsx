import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import buildPropsForComponent from './buildPropsForComponent';
import buildPropsForController from './buildPropsForController';
import loopDataToRetrive from './loopDataToRetrive';
import restAction from '../actions';

export default (WrappedComponent, dataToRetrieve) => {
    class Controller extends React.Component {
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

    Controller.propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    return connect((state, ownProps) => buildPropsForController(dataToRetrieve, state, ownProps))(Controller);
}