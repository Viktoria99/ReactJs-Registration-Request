import { Component } from 'react';
import TabItem from 'react/tab-item';
import Tabs from 'react/tabs';
import PropTypes from 'prop-types';
import './styles.css';

const _ = require('lodash');

class Tabs extends Component {
    static propTypes = {
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        }),
        user: PropTypes.shape({
            permissions: PropTypes.arrayOf(PropTypes.string)
        })
    };

    handleTabClick = (event) => {
        event.preventDefault();
        this.props.history.push(event.target.getAttribute('href'));
    };

    checkPermission = action => !this.props.user.permissions.some(t => t.startsWith('documents') && t.endsWith(action));

    render() {
        const { history, user } = this.props;
        const userIsEmpty = _.isEmpty(user);

        return (
            <div>
                <Tabs className='documentsTabs'>
                    <TabItem
                        url='/documents/create'
                        onClick={ this.handleTabClick }
                        checked={ history.location.pathname === '/documents/create' }
                        disabled={ userIsEmpty || this.checkPermission('create') }
                    >
                        Deals
                    </TabItem>               
                   
                </Tabs>
            </div>
        );
    }
}

export default Tabs;
