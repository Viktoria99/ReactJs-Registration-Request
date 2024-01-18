import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react/link';
import style from 'react/style';

import { closePopup } from '../../../actions/popupManipulation';

import './styles.css';

const IconClose = require('react/icon/ui/fail').default;

const mapStateToProps = state => ({
    user: state.auth.user,
    opened: state.popup.opened
});

const mapDispatchToProps = dispatch => ({
    closePopup: () => { dispatch(closePopup()); }
});

@style('errorListPopup')
class MessageError extends Component {
    static propTypes = {
        document: PropTypes.string,
        closePopup: PropTypes.func,
        appHost: PropTypes.string,
        opened: PropTypes.bool,
        innerAppHost: PropTypes.string,
        errorList: PropTypes.arrayOf(PropTypes.string),
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

    closeHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.closePopup();
    };

    render(style) {
        if (this.props.opened) {
            return (
                <div className={ style('b-popup') }>
                    <div className={ style('b-popup-content') }>
                        <div className={ style('popupHeaderContainer') }>
                            <div className={ style('headerPopupName') }>Information about errors</div>
                            <div className='headerPopupCloser'>
                                <Link
                                    onClick={ (event) => { this.closeHandler(event); } }
                                    className={ style('popupButtonClose') }
                                >
                                    <IconClose theme='react-on-color' />
                                </Link>
                            </div>
                        </div>
                        <div className={ style('bodyPopup') }>
                            { this.props.errorList.map(item => this.renderErrors(style, item)) }
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    renderErrorItem(style, item) {
        return (
            <div className={ style('errorPopupRow') }>
                { item }
            </div>
        );
    }

    renderErrors(style, error) {
        if (error.title) {
            return (
                <div className={ style('errorTitledErrorBlock') }>
                    <div className={ style('errorPopupRowTitle') }>
                        { error.title }
                    </div>
                    { error.errors.map((error, i) => this.renderErrorItem(style, `${i + 1}. ${error}`)) }
                </div>
            );
        }

        return this.renderErrorItem(style, error);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageError);
