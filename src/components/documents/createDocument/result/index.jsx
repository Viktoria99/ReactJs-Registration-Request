import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Heading from 'react/heading';
import Button from 'react/button';
import Amount from 'react/amount';
import Link from 'react/link';
import { connect } from 'react-redux';
import PdfIcon from 'react/icon/file/format-pdf';
import DocIcon from 'react/icon/file/format-doc';
import EmptyIcon from 'react/icon/file/account-main';
import Notification from 'react/notification';
import Spin from 'react/spin';
import style from 'react/style';

import FieldValue from '../../../ui/field-value';
import RequestErrors from './requestErrors';
import { getDocumentFileNew } from '../../../../actions/documents/getDocFileNew';
import { setFileError } from '../../../../actions/documents/documentFile';
import { DealUrl, ProductClientUrl } from '../../../../utils/linkConstructors';
import { createDocumentRequest, hideDocumentRequestError } from '../../../../actions/documents/createDocumentRequest';
import Buttons from '../buttons';

import './styles.css';

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        externalSystems: state.settings.externalSystems,
        isFileFetching: state.documentFile.isFetching,
        isFileError: state.documentFile.isError,
        fileErrorTraceId: state.documentFile.error,
        requestFetching: state.productRequest.isFetchingCreation,
        documentRequest: state.productRequest,
        errorCreation: state.productRequest.errorCreation,
        isErrorCreation: state.productRequest.isErrorCreation
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getDocumentFileNew,
            setFileError,
            createDocumentRequest,
            hideDocumentRequestError
        },
        dispatch);
}

@style('resultBlock')
class Result extends Component {
    static propTypes = {
        clientINN: PropTypes.string,
        errorCreation: PropTypes.string,
        isErrorCreation: PropTypes.bool,
        clientId: PropTypes.string,
        clientName: PropTypes.string,
        productPropTypesName: PropTypes.string,
        requestId: PropTypes.string,
        productPropTypes: PropTypes.string,
        sum: PropTypes.number,
        dealStateId: PropTypes.number,
        dealId: PropTypes.number,
        externalSystems: PropTypes.shape(),
        isFileFetching: PropTypes.bool,
        isFileError: PropTypes.bool,
        getDocumentFileNew: PropTypes.func,
        setFileError: PropTypes.func,
        hideDocumentRequestError: PropTypes.func,
        fileErrorTraceId: PropTypes.string,
        user: PropTypes.shape({
            permissions: PropTypes.arrayOf(PropTypes.string),
            domain: PropTypes.string,
            login: PropTypes.string
        }),
        createDocumentRequest: PropTypes.func,
        history: PropTypes.shape({
            push: PropTypes.func
        }),
        documentRequest: PropTypes.shape({
            requestResult: PropTypes.shape({
                id: PropTypes.string
            })
        }),
        productInfo: PropTypes.shape(),
        requestFetching: PropTypes.bool
    };

    createClickHandler = (request) => {
        const { login, domain } = this.props.user;

        let params = {
            ...request,
            login: `${domain}\\${login}`
        };

        this.props.createDocumentRequest(params);
    };

    getFileHandler = (format) => {
        this.setState({ target: format });
        this.getDocFile(format);
    };

    closeNotificationHandler = () => {
        this.props.setFileError();
        this.props.hideDocumentRequestError();
    };

    getDocFile = (format) => {
        let { productType, dealStateId } = this.props.productInfo;
        this.props.getDocumentFileNew(productType, 'main', dealStateId, format);
    };

    constructor(props) {
        super(props);
        this.state = {
            target: null
        };
    }

    render(style) {
        const {
            externalSystems,
            requestId,
            isFileFetching,
            isFileError,
            fileErrorTraceId,
            productInfo,
            isErrorCreation
        } = this.props;

        const {
            inn,
            registratorId,
            clientName,
            productTypeName,
            sum,
            dealStateId,
            dealId,
            sureties
        } = productInfo;

        const amountSum = {
            value: sum * 100,
            currency: {
                code: 'RUR',
                minority: 100
            }
        };

        return (
            <div className={ style('main') }>
                <Heading
                    className={ style('heading') }
                    size='m'
                >
                    Client { clientName }
                </Heading>
                <Notification
                    className={ style('notification') }
                    visible={ isFileError || isErrorCreation }
                    status='error'
                    offset={ 10 }
                    stickTo='right'
                    title='Arise error after loading file'
                    onCloserClick={ this.closeNotificationHandler }
                >
                    Please call tech support
                    <div className={ style('downloadingError') } >{ fileErrorTraceId }</div>
                </Notification>
                <div className={ style('clientInfo') }>
                    <FieldValue
                        className={ style('keyValue') }
                        text={ <div className={ style('keyValue') } >Number</div> }
                        value={
                            <div className={ style('keyValue') }>
                                { inn }
                            </div>
                        }
                    />
                    <FieldValue
                        className={ style('keyValue') }
                        text={ <div className={ style('keyValue') } >RegisrationId</div> }
                        value={
                            <div className={ style('keyValue') }>
                                { registratorId }
                            </div>
                        }
                    />
                </div>
                <Heading className={ style('heading') } size='m'>
                    { productTypeName } sum&sp;
                    <Amount size='s' amount={ amountSum } isHeading={ true } />
                </Heading>
                <div className={ style('mainInfoContainer') }>
                    <div className={ style('leftBlock') }>
                        <FieldValue
                            className={ style('keyValue') }
                            text={ <div className={ style('keyValue') } >Deal</div> }
                            value={
                                <Link
                                    url={ DealUrl(externalSystems.appHost, dealId, dealStateId) }
                                    text='Go to external system'
                                    target='_blank'
                                />
                            }
                        />
                        <FieldValue
                            className={ style('keyValue') }
                            text={ <div className={ style('keyValue') } >Request</div> }
                            value={
                                <Link
                                    url={ ProductClientUrl(externalSystems.innerAppHost, requestId) }
                                    text='Go to inner system'
                                    target='_blank'
                                />
                            }
                        />
                    </div>
                    <div className={ style('rightBlock') }>
                        <div className={ style('iconsBlock') }>
                            <Button
                                className={ style('iconButton') }
                                size='m'
                                icon={
                                    isFileFetching && this.state.target === 'pdf' ?
                                        <Spin visible={ true } /> :
                                        <PdfIcon size='m' />
                                }
                                onClick={ () => this.getFileHandler('pdf') }
                            >
                            .pdf
                            </Button>
                            <Button
                                className={ style('iconButton') }
                                size='m'
                                icon={
                                    isFileFetching && this.state.target === 'docx' ?
                                        <Spin visible={ true } /> :
                                        <DocIcon size='m' />
                                }
                                onClick={ () => this.getFileHandler('docx') }
                            >
                            .docx
                            </Button>
                            <Button
                                className={ style('iconButton') }
                                size='m'
                                icon={
                                    isFileFetching && this.state.target === 'rtf' ?
                                        <Spin visible={ true } /> :
                                        <EmptyIcon size='m' />
                                }
                                onClick={ () => this.getFileHandler('rtf') }
                            >
                            .rtf
                            </Button>
                        </div>
                    </div>
                </div>
                { this.renderDocumentRequestBlock(style) }
            </div>
        );
    }

    renderDocumentRequestBlock(style) {
        const { documentRequest } = this.props;

        if (documentRequest.productInfo.validations) {
            return (
                [
                    <Buttons documentRequest={ documentRequest } history={ this.props.history } />,
                    <div className={ style('errorDivDoc') }>
                        {
                            documentRequest
                                .productInfo
                                .validations
                                .map(err => this.renderValidationError(style, err))
                        }
                        <RequestErrors />
                    </div>
                ]
            );
        }

        return <Buttons documentRequest={ documentRequest } history={ this.props.history } />;
    }

    renderValidationError(style, err) {
        return (
            <div className={ style('validateError') }> { err } </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
