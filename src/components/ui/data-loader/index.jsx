import Type from 'prop-types';
import { Component } from 'react';
import Spin from 'react/spin';
import style from 'react/style';
import './styles.css';

@style('data-loader')
class DataLoader extends Component {
    static propTypes = {
        children: Type.node,
        isFetching: Type.bool,
        needPadding: Type.bool
    }

    render(style) {
        const { isFetching, children, needPadding = true } = this.props;

        return (
            !isFetching
                ? children
                : (
                    <div className={ style('spin', { needPadding }) }>
                        <Spin size='xl' visible={ true } />
                    </div>
                ));
    }
}

export default DataLoader;
