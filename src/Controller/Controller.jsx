import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import buildPropsForComponent from './buildPropsForComponent';
import buildPropsForController from './buildPropsForController';
import loopDataToRetrive from './loopDataToRetrive';
import isLoading from './isLoading';
import hasErrors from './hasErrors';
import restAction from '../actions';
import { getSettings } from '../settings';

const defaultSettings = {
    autoHandleError: true,
    autoHandleLoading: true,
};

export default (WrappedComponent, dataToRetrieve, componentSettings = {}) => {
    componentSettings = {
        ...defaultSettings,
        ...componentSettings,
    };
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
            if (props[getSettings().internalPropPrefix + 'error']) return;

            loopDataToRetrive(dataToRetrieve, props, info => {
                if (info.onlyActions) return;
                if (info.onlyPagination) return;
                props.dispatch(restAction(info).getIfNeeded());
            });
        }

        render() {
            let error = false;
            let loading = false;
            const settings = getSettings();

            if (this.props[settings.internalPropPrefix + 'error']) {
                return <div>error</div>;
            }

            if (hasErrors(dataToRetrieve, this.props)) {
                if (
                    componentSettings.autoHandleError &&
                    settings.components.error
                ) {
                    return <settings.components.error />;
                }

                error = true;
            }

            if (isLoading(dataToRetrieve, this.props)) {
                if (
                    componentSettings.autoHandleLoading &&
                    settings.components.loading
                ) {
                    return <settings.components.loading />;
                }

                loading = true;
            }

            return (
                <WrappedComponent
                    {...buildPropsForComponent(dataToRetrieve, this.props, {
                        error,
                        loading,
                    })}
                />
            );
        }
    }

    Controller.propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    return connect((state, ownProps) =>
        buildPropsForController(dataToRetrieve, state, ownProps)
    )(Controller);
};
