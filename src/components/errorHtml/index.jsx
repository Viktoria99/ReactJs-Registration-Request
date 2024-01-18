import { Component } from 'react';
import ErrorPage from 'react/error-page';

export default class Error extends Component {
    render() {
        return (
            <ErrorPage
                returnUrl='/'
                title='404'
                text='Page not found :('
            />
        );
    }
}
