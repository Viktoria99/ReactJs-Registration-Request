import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/app';
import DocumentsPage from './components/documents/createDocument';
import DocumentDetails from './components/documents/documentDetails';
import StartPage from './components/startPage';

const WrappedComponent = (Component, props) => (
    <App { ...props }>
        <Component { ...props } />
    </App>
);

export default (
    <Switch>
        <Route
            exact={ true }
            path='/documents/create'
            render={ props => WrappedComponent(DocumentsPage, props) }
        />
        <Route
            exact={ true }
            path='/documents/details/*'
            render={ props => WrappedComponent(DocumentDetails, props) }
        />
        <Route
            exact={ true }
            path='/documents'
            render={ () => <Redirect to='/documents/create' /> }
        />
        <Route
            exact={ true }
            path='/'
            render={ props => WrappedComponent(StartPage, props) }
        />
    </Switch>
);
