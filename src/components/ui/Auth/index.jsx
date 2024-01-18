import { Component } from 'react';
import PropTypes from 'prop-types';
import Paragraph from 'react/paragraph';
import Link from 'react/link';

class Auth extends Component {
    static propTypes = {
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        }),
        user: PropTypes.shape(),
        children: PropTypes.shape()
    };

    render() {
        const { history, user, children } = this.props;
        const splittedPathname = history.location.pathname.split('/');
        const hasPermission = user.permissions.some(
            permission =>
                permission.startsWith(splittedPathname[1])
                                        && permission.endsWith(splittedPathname[2]));

        return (
            hasPermission
                ? children
                : (
                    <div>
                        <Paragraph view='lead'>
                        You don`t have permissions:
                        </Paragraph>
                        <Link
                            text='02.05.52'
                            url=''
                            target='_blank'
                        />
                    </div>
                ));
    }
}

export default Auth;
