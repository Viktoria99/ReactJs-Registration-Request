import { Component } from 'react';
import { connect } from 'react-redux';
import Heading from 'react/heading';
import Input from 'react/input';
import Button from 'react/button';
import Type, { PropTypes } from 'prop-types';
import Spin from 'react/spin';
import style from 'react/style';
import autobind from 'autobind-decorator';
import Result from './result';
import Tab from './tab';
import Auth from '../../ui/Auth';

import { getDocuments } from '../../../actions/documents/getDocuments';
import './styles.css';

const IconError = require('react/icon/ui/error').default;
const _ = require('lodash');

const mapStateToProps = state => ({
    isFetching: state.productRequest.isFetching,
    isError: state.productRequest.isError,
    error: state.productRequest.error,
    businessError: state.productRequest.businessError,
    productInfo: state.productRequest.productInfo,
    user: state.auth.user,
    requestId: state.productRequest.requestId
});

const mapDispatchToProps = dispatch => ({
    getDocuments: (id, type) => dispatch(getDocuments(id, type))
});

@connect(mapStateToProps, mapDispatchToProps)
@style('documents')
class DocumentsPage extends Component {
    static propTypes = {
        productInfo: Type.shape(),
        error: Type.shape(),
        businessError: Type.shape(),
        isError: Type.bool,
        isFetching: Type.bool,
        getDocuments: Type.func,
        getProductByRequestId: Type.func,
        user: PropTypes.shape({
            permissions: PropTypes.arrayOf(PropTypes.string)
        }),
        requestId: PropTypes.string,
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        })
    };

    render(style) {
        let {
            productInfo, isFetching, isError, user, history, requestId
        } = this.props;

        return (
            <div className={ style('rootContainer') }>
                <Heading>Create Document</Heading>
                <Tab history={ history } user={ user } />
                <Auth history={ history } user={ user }>
                    <div className={ style('request') }>
                        <Input
                            className={ style('input') }
                            size='m'
                            label='Enter number'
                            mask='1111111111'
                            clear={ true }
                            value={ requestId }                            
                            onKeyDown={ this.inputKeyDownHandler }
                        />
                        <Button
                            size='m'
                            icon={
                                isFetching
                                    ? <Spin
                                        size='m'
                                        theme='react-on-color'
                                        visible={ true }
                                    />
                                    : null
                            }
                            text='Find'
                            view='extra'
                            type='submit'
                            className={ style('button') }
                            onClick={ this.sendRequest }
                        />
                    </div>
                    {
                        !_.isEmpty(productInfo) || isFetching || isError
                            ? this.renderResult(style)
                            : null
                    }
                </Auth>
            </div>
        );
    }

    renderResult(style) {
        const {
            productInfo,
            history,
            requestId,
            isFetching,
            businessError,
            isError
        } = this.props;

        if (!isFetching) {
            if (businessError && businessError.detail) {
                return this.renderBuisnessError(style);
            }

            if (isError) {
                return this.renderError(style);
            }

            return (
                <Result
                    history={ history }
                    productInfo={ productInfo }
                    requestId={ requestId }
                />
            );
        }
        return null;
    }

    renderBuisnessError(style) {
        return (
            <div className={ style('businessError') }>
                <div className={ style('rowErrorContainer') }>
                    { this.props.businessError.detail }
                </div>
            </div>
        );
    }

    renderError(style) {
        const { error } = this.props;
        return (
            <div className={ style('error') }>
                <div className={ style('rowErrorContainer') }>
                    <IconError className={ style('iconError') } colored={ true } size='m' />
                    <div>Arise Error</div>
                </div>
                <div className={ style('errorToken') }>{ error }</div>
            </div>
        );
    }

    @autobind
    sendRequest() {
        const { requestId, getDocuments } = this.props;
        if (requestId !== '') {
            getDocuments(requestId, 'main');
        }
    }

    @autobind
    inputKeyDownHandler(evt) {
        if (evt.key === 'Enter') {
            this.sendRequest();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
