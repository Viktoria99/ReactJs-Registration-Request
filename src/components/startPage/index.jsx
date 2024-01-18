import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'react/heading';
import Paragraph from 'react/paragraph';
import './styles.css';

const _ = require('lodash');

const mapStateToProps = state => ({
    user: state.auth.user,
    auth: state.auth,
    isFetching: state.auth.isLoadingUser
});

@connect(mapStateToProps)
class StartPage extends Component {
    static propTypes = {
        error: PropTypes.bool,
        children: PropTypes.node,
        auth: PropTypes.shape({
            user: PropTypes.shape(),
            isError: PropTypes.bool,
            error: PropTypes.string,
            isLoadingUser: PropTypes.bool
        }),
        history: PropTypes.shape({
            go: PropTypes.func,
            push: PropTypes.func,
            location: PropTypes.shape({
                pathname: PropTypes.string
            })
        }),
        user: PropTypes.string
    };

    render() {
        return (
            <div>
                <Heading size='xl'>Registration system</Heading>
                {
                   _.isEmpty(this.props.auth.user) ?
                    <div className='userAuthError'>                        
                    </div> : <div></div>                        
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(StartPage);
