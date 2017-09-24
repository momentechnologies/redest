import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import buildPropsForComponent from './buildPropsForComponent';
import buildPropsForController from './buildPropsForController';
import loopDataToRetrive from './loopDataToRetrive';
import isLoading from './isLoading';
import hasErrors from './hasErrors';
import restAction from '../actions';
import settings from '../settings';

export default (WrappedComponent, dataToRetrieve) => {
    class Controller extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentWillMount() {
            this.check(this.props);
        }
        componentWillReceiveProps(nextProps) {
            this.check(nextProps);
        }
        check(props) {
            if (props[settings.internalPropPrefix + 'error']) return;
            loopDataToRetrive(dataToRetrieve, props, (info) => {
                props.dispatch(restAction(info).getIfNeeded(info.filter));
            });
        }
        render() {
            if (this.props[settings.internalPropPrefix + 'error']) {
                return (
                    <div>
                        error
                    </div>
                );
            }
            if (settings.components.error && hasErrors(dataToRetrieve, this.props)) {
                return (
                    <settings.components.error/>
                );
            }
            if (settings.components.loading && isLoading(dataToRetrieve, this.props)) {
                return (
                    <settings.components.loading/>
                );
            }
            return (
                <WrappedComponent
                    {...buildPropsForComponent(dataToRetrieve, this.props)}
                />
            );
        }
    }

    Controller.propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    return connect((state, ownProps) => buildPropsForController(dataToRetrieve, state, ownProps))(Controller);
}