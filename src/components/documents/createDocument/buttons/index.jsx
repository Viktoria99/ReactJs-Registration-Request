import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react/button';
import Spin from 'react/spin';
import Link from 'react/link';
import style from 'react/style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createDocumentRequest, hideDocumentRequestError } from '../../../../actions/documents/createDocumentRequest';

import './styles.css';

const _ = require('lodash');

const mapStateToProps = state => ({
    isFetching: state.productRequest.isFetchingCreation,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createDocumentRequest,
        hideDocumentRequestError
    },
    dispatch);

@style('buttons')
class Buttons extends Component {
    static propTypes = {
        document: PropTypes.string,
        appHost: PropTypes.string,
        innerAppHost: PropTypes.string,
        isFetching: PropTypes.bool,
        documentRequest: PropTypes.shape(),
        createDocumentRequest: PropTypes.func,
        user: PropTypes.shape({
            permissions: PropTypes.arrayOf(PropTypes.string),
            domain: PropTypes.string,
            login: PropTypes.string,
            displayName: PropTypes.string
        }),
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        })
    };

    redirectLinkHandler = (event) => {
        event.preventDefault();
        const { documentRequest } = this.props;
        this.props.history.push(
            `/documents/details/${documentRequest.productInfo.id || documentRequest.requestResult.id}`
        );
    };

    createClickHandler = (request) => {
        const { login, domain } = this.props.user;

        let params = {
            ...request,
            login: `${domain}\\${login}`
        };

        this.props.createDocumentRequest(params);
    };

    render(style) {
        const {
            documentRequest,
            isFetching
        } = this.props;

        if (documentRequest.requestResult.id || !!documentRequest.productInfo.id) {
            return (
                <div className={ style('rootContainer') }>
                    <Link
                        size='l'
                        className={ style('link') }
                        onClick={ this.redirectLinkHandler }
                        text='Open request'
                        target='_blank'
                    />
                </div>
            );
        }

        return (
            <div className={ style('rootContainer') }>
                <Button
                    size='m'
                    view='extra'
                    icon={
                        isFetching ?
                            <Spin theme='react-on-color' visible={ true } /> :
                            null
                    }
                    className={ style('documentRequestButton') }
                    onClick={ () => { this.createClickHandler(documentRequest.productInfo); } }
                    text='Start formation'
                    disabled={ !_.isEmpty(documentRequest.productInfo.validations) }
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

