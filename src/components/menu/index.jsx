import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from 'react/application-menu';
import MenuItem from 'react/application-menu-item';

class Menu extends Component {
    static propTypes = {
        menuItems: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    name: PropTypes.string,
                    url: PropTypes.string,
                    tag: PropTypes.string
                })
        ),
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    render() {
        const { menuItems } = this.props;

        if (!menuItems) {
            return <Menu />;
        }

        return (
            <Menu>
                { menuItems.map(this.renderMenuItem.bind(this)) }
            </Menu>
        );
    }

    renderMenuItem(item) {
        const { location } = this.props;
        if (!item.name) {
            return null;
        }
        return (
            <MenuItem
                key={ item.tag }
                url={ item.url }
                checked={ item.url === location.pathname.split('/')[1] }
            >
                { item.name }
            </MenuItem>
        );
    }
}

export default Menu;
