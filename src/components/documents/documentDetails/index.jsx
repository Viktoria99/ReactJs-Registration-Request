import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'react/heading';
import Link from 'react/link';
import Button from 'react/button';
import style from 'react/style';

import DataLoader from '../../ui/data-loader';
import Person from '../../ui/Person/Person';
import Auth from '../../ui/Auth';

import { getDocumentRequestDetails } from '../../../actions/documents/documentRequestDetails';
import { updateDocumentRequestDetails } from '../../../actions/documents/documentUpdateDetails';
import { DealUrl, ClientUrl, ProductUrl } from '../../../utils/linkConstructors';
import { openPopup } from '../../../actions/popupManipulation';
import Clock from 'react/clock';

import './styles.css';

const IconUpdate = require('react/icon/action/repeat').default;
const IconBack = require('react/icon/action/back').default;
const IconError = require('react/icon/ui/error').default;

const _ = require('lodash');

const mapStateToProps = state => ({
    appHost: state.settings.externalSystems.appHost,
    innerAppHost: state.settings.externalSystems.innerAppHost,
    isFetching: state.documentRequestDetails.isFetching,
    documentDetails: state.documentRequestDetails.documentRequestDetails,
    error: state.documentRequestDetails.error,
    isError: state.documentRequestDetails.isError,
    user: state.auth.user,
    popupOpened: state.popup.opened,
    updateTime: state.documentRequestDetails.updateTime,
    isFetchingRestart: state.restartDocumentRequest.isFetching,
    restartDetails: state.restartDocumentRequest.restartDetails
});

const mapDispatchToProps = dispatch => ({
    getDocumentRequestDetails:
        (documentId) => { dispatch(getDocumentRequestDetails(documentId)); },
    openPopup: () => { dispatch(openPopup()); },
    updateDocumentRequestDetails:
        (documentId) => { dispatch(updateDocumentRequestDetails(documentId)); }
});

@style('documentDetails')
class DocumentDetails extends Component {
    static propTypes = {
        error: PropTypes.bool,
        appHost: PropTypes.string,
        children: PropTypes.node,
        updateTime: PropTypes.shape({}),
        restartRequest: PropTypes.func,
        updateDocumentRequestDetails: PropTypes.func,
        openPopup: PropTypes.func,
        innerAppHost: PropTypes.string,
        documentDetails: PropTypes.arrayOf(Object),
        auth: PropTypes.shape({
            user: PropTypes.shape(),
            isError: PropTypes.bool,
            error: PropTypes.string,
            isLoadingUser: PropTypes.bool
        }),
        user: PropTypes.shape({
            permissions: PropTypes.arrayOf(PropTypes.string),
            domain: PropTypes.string,
            login: PropTypes.string,
            displayName: PropTypes.string
        }),
        match: PropTypes.shape({
            params: PropTypes.arrayOf(PropTypes.string)
        }),
        getdocs: PropTypes.func,
        history: PropTypes.shape({
            goBack: PropTypes.func,
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        }),
        getDocumentRequestDetails: PropTypes.func,
        isError: PropTypes.bool,
        documents: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                created: PropTypes.string,
                sum: PropTypes.number,
                currency: PropTypes.string,
                login: PropTypes.string,
                description: PropTypes.string,
                parentDeal: PropTypes.shape({
                    clientName: PropTypes.string
                })
            }))
    };

    handleBackClick = () => {
        this.props.history.push('/documents/history');
    };

    openPopupHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.openPopup();
    };

    setUserName = userName => (<Person value={ userName } needPopup={ true } />);

    handleUpdateClick = () => {
        this.props.getDocumentRequestDetails(this.props.match.params[0]);
    };

    constructor(props) {
        super(props);
        this.state = { needUpdate: true };
    }

    componentDidMount() {
        const {
            user,
            getDocumentRequestDetails,
            match
        } = this.props;        
        if (_.isEmpty(user) || !user.permissions.some(p => p === 'documents_details')) {
            return;
        }
        getDocumentRequestDetails(match.params[0]);
    }

    componentDidUpdate() {
        const {
            updateDocumentRequestDetails,
            match
        } = this.props;
        if (this.props.documentDetails) {
            const { status } = this.props.documentDetails;
            const notFinalStatus = status !== 'Done' && status !== 'Dead';
            if (this.state.needUpdate === true && notFinalStatus) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ needUpdate: false });
                setTimeout(
                    () => {
                        this.setState({ needUpdate: true });
                        updateDocumentRequestDetails(match.params[0]);
                    }, 2000
                );
            }
        }
    }

    render(style) {
        const {
            isError,
            history,
            user,
            documentDetails
        } = this.props;
        return (
            <div className={ style('rootContainer') }>
                <Heading size='m'>
                    Additional information about document
                </Heading>
                <Auth history={ history } user={ user }>
                    <DataLoader { ...this.props }>
                        <div className={ style('fullInfoContainer') }>
                            {
                                isError
                                    ? this.renderError(style)
                                    : this.renderContent(style, documentDetails)
                            }
                        </div>
                    </DataLoader>
                </Auth>
            </div>
        );
    }

    renderContent(style, document) {
        if (_.isEmpty(document)) {
            return null;
        }
        const { appHost, innerAppHost } = this.props;

        return (
            <div className={ style('detailsContainer') }>
                <div className={ style('controlButtonsContainer') }>
                    <Button
                        size='m'
                        onClick={ this.handleBackClick }
                        icon={ <IconBack /> }
                    >
                        Назад
                    </Button>
                    <Button
                        size='m'
                        onClick={ this.handleUpdateClick }
                        icon={ <IconUpdate className={ style('rotate') } /> }
                    >
                        Update
                    </Button>
                </div>               
                <Heading className={ style('clientHeading') } size='s'>{ document.clientName }</Heading>
                <div className={ style('baseInfoContainer') }>
                    <div className={ style('columnContainer') }>
                        <Heading className={ style('caption') } size='s'>Information about client</Heading>
                        <div className={ style('clientInfoContainer') }>
                            <div id='documentClientInfoItem1'>Client:</div>
                            <div id='documentClientInfoItem2'>
                                <Link
                                    className={ style('baseInfoLink') }
                                    text='Go in system'
                                    target='_blank'
                                    url={ ClientUrl(appHost, document.clientId) }
                                />
                            </div>
                            <div id='documentClientInfoItem3'>ClientNumber:</div>
                            <div id='documentClientInfoItem4'>{ document.number }</div>
                            <div id='documentClientInfoItem5'>RegistrationId:</div>
                            <div id='documentClientInfoItem6'>{ document.registrationId }</div>
                        </div>
                    </div>
                    <div className={ style('whiteSpace') } />
                    <div className={ style('columnContainer') }>
                        <Heading className={ style('caption') } size='s'>Deal</Heading>
                        <div className={ style('parentDealContainer') }>
                            <div id='documentParentDealItem1'>DEAL:</div>
                            <div id='documentParentDealItem2'>
                                <Link
                                    className={ style('baseInfoLink') }
                                    url={ DealUrl(appHost, document.dealId, document.dealStateId) }
                                    text='Go in system'
                                    target='_blank'
                                />
                            </div>
                            <div id='documentParentDealItem3'>Request for product:</div>
                            <div id='documentParentDealItem4'>
                                <Link
                                    className={ style('baseInfoLink') }
                                    url={ ProductUrl(innerAppHost, document.productRequestId) }
                                    text={ document.productRequestId }
                                    target='_blank'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ style('documntInfoContainer') }>
                    { this.renderDocumentStatus(style, document.status) }
                    <div className={ style('key') }>
                        <div className={ style('lastStep') }>Last step:</div>
                        <span className={ style('status') }>
                            { document.description.toLowerCase() }
                        </span>
                        <Clock isRunning={ document.status !== 'Done' && document.status !== 'Dead' } />
                    </div>                   
                </div>
            </div>
        );
    }

    renderError(style) {
        const { error } = this.props;
        return (
            <div className={ style('error') }>
                <div className={ style('rowErrorContainer') }>
                    <div className={ style('iconError') }><IconError colored={ true } size='m' /></div>
                    <div>Error</div>
                </div>
                <div className={ style('errorToken') }>{ error }</div>
            </div>
        );
    }

    renderDocumentStatus(style, status) {
        switch (status) {
            case 'Created':
                return this.renderHtmlStatus(style, 'creat', 'created');
            case 'InProgress':
            case 'Failed':
                return this.renderHtmlStatus(style, 'in progress.', 'inProgress');
            case 'Done':
                return this.renderHtmlStatus(style, 'done.', 'done');
            case 'Dead':
                return this.renderHtmlStatus(
                    style, 'error', 'dead'
                );
            default:
                return this.renderHtmlStatus(style, 'not indefined.', 'documentStatusDead');
        }
    }

    renderHtmlStatus(style, statusName, docStatus) {
        return (
            <div className={ style('statusContainer') }>
                <div className={ style('keyStatus') }>Status request:</div>
                <div className={ style('documentStatus', { '': docStatus }) }>{ statusName }</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
