import { connect } from 'react-redux';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import style from 'react/style';
import Link from 'react/link';
import Notification from 'react/notification';
import MessageError from '../../../../ui/MessageError';

import { openPopup } from '../../../../../actions/popupManipulation';
import { hideDocumentRequestError } from '../../../../../actions/documents/createDocumentRequest';
import './styles.css';

const IconError = require('react/icon/ui/error').default;
const _ = require('lodash');

const mapStateToProps = state => ({
    user: state.auth.user,
    documentRequest: state.productRequest.requestResult,
    isFetching: state.productRequest.isFetchingCreation,
    traceId: state.productRequest.errorCreation,
    isError: state.productRequest.isErrorCreation
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        openPopup,
        hideDocumentRequestError
    },
    dispatch);

@style('request-errors')
class RequestErrors extends Component {
    static propTypes = {
        status: Type.string,
        openPopup: Type.func,
        getDocumentRequestDetails: Type.func,
        hideDocumentRequestError: Type.func,
        isError: Type.bool,
        traceId: Type.string,
        documentRequest: Type.shape(),
        user: Type.shape({
            domain: Type.string,
            login: Type.string
        }),
        isFetching: Type.bool
    };

    openPopupHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.openPopup();
    };

    closeNotificationHandler = () => {
        this.props.hideDocumentRequestError();
    };

    render(style) {
        const { isError } = this.props;

        if (isError) {
            return this.renderUnhandledError(style);
        }
        return this.renderErrorDetails(style);
    }

    renderErrorDetails(style) {
        const {
            hasError,
            errorDescription,
            validations,
            testValidations
        } = this.props.documentRequest;

        if (!hasError) {
            return null;
        }

        // eslint-disable-next-line no-restricted-globals
        this.openPopupHandler(event);

        return (
            <div className={ style('error-container') }>
                <IconError
                    className={ style('icon-error') }
                    colored={ true }
                />
                { errorDescription }&sp;
                {
                    _.isEmpty(validations) && _.isEmpty(validations)
                        ? null
                        :
                        <Link
                            onClick={ (event) => { this.openPopupHandler(event); } }
                            text='Look'
                        />
                }
                {
                    _.isEmpty(validations)
                        ? null
                        : <MessageError errorList={ validations } />
                }
                {
                    _.isEmpty(validations)
                        ? null
                        : <MessageError errorList={ validations } />
                }
            </div>
        );
    }

    renderUnhandledError(style) {
        const { traceId, isError } = this.props;
        return (
            <Notification
                className={ style('notification') }
                visible={ isError }
                status='error'
                offset={ 10 }
                stickTo='right'
                title='Error'
                onCloserClick={ this.closeNotificationHandler }
            >
                Please, write support service 
                <div className={ style('downloadingError') } >{ traceId }</div>
            </Notification>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestErrors);
