import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Page from 'react/page';
import Content from 'react/content';
import ErrorPage from 'react/error-page';
import Header from 'react/header';
import Footer from 'react/footer';
import User from 'react/user';
import style from 'react/style';

import Menu from '../menu';
import DataLoader from '../ui/data-loader';
import { getVisibleMenuItems } from '../selectors/menu-items';
import { getUser } from '../../actions/auth';
import './app.css';

const _ = require('lodash');

function mapStateToProps(state) {
    return {
        screen: state.app.screen,
        error: state.app.error || state.auth.isError,
        auth: state.auth,
        settings: state.settings,
        menuItems: getVisibleMenuItems(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getUser
        },
        dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@style('app')
class App extends Component {
    static propTypes = {
        error: PropTypes.bool,
        authPage: PropTypes.string,
        children: PropTypes.node,
        auth: PropTypes.shape({
            user: PropTypes.shape(),
            isError: PropTypes.bool,
            error: PropTypes.string,
            isLoadingUser: PropTypes.bool
        }),
        getUser: PropTypes.func,
        settings: PropTypes.shape(),
        location: PropTypes.shape(),
        menuItems: PropTypes.arrayOf(PropTypes.shape(
            {
                url: PropTypes.string,
                name: PropTypes.string,
                permission: PropTypes.string
            })),
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        })
    };

    logoClickHandler = (e) => {
        const { settings } = this.props;
        e.preventDefault();
        document.location.href = `${document.location.origin}${settings.contextRoot}/`;
    };

    getUserInfo = (user) => {
        const splittedFio = user.split(' ');
        let result = splittedFio[0];

        if (splittedFio[1]) {
            result += ` ${splittedFio[1][0]}.`;
        }

        if (splittedFio[2]) {
            result += ` ${splittedFio[2][0]}.`;
        }

        return result;
    };

    componentDidMount() {
        const { auth } = this.props;
        if (typeof window !== 'undefined' && _.isEmpty(auth.user)) {
            this.props.getUser();
        }
    }

    render(style) {
        const {
            auth, location, history
        } = this.props;

        const splitedPathname = location.pathname.split('/');

        if (!_.isEmpty(auth.user) && splitedPathname[1] !== '') {
            if (!auth.user.permissions.some(permission => permission.startsWith(splitedPathname[1]))) {
                history.push('/');
            }
        }

        return (
            <div className={ style() }>
                { this.props.error ? this.renderErrorPage() : this.renderPage() }
            </div>
        );
    }

    renderPage() {
        const { auth } = this.props;

        let userText = 'User is not authorized';
        if (!_.isEmpty(auth.user)) {
            userText = this.getUserInfo(auth.user.displayName);
        }

        return (
            <Page
                header={
                    <Header
                        onLogoClick={ (e) => { this.logoClickHandler(e); } }
                        menu={ <Menu { ...this.props } /> }
                        rightContent={
                            <User
                                id='idAppUser'
                                text={ auth.isLoadingUser ? 'Progress...' : userText }
                            />
                        }
                    />
                }
                footer={ <Footer /> }
            >
                <DataLoader isFetching={ auth.isLoadingUser }>
                    <Content theme='react-on-white'>
                        { this.props.children }
                    </Content>
                </DataLoader>
            </Page>
        );
    }

    renderErrorPage() {
        return (
            <ErrorPage returnUrl='/' header={ <Header /> } />
        );
    }
}

export default App;
