import { Component } from 'react';
import Type from 'prop-types';
import style from 'react/style';
import Popup from 'react/popup/popup';
import './styles.css';

@style('fio-value-block')
class Person extends Component {
    static propTypes = {
        text: Type.string,
        value: Type.string,
        needPopup: Type.bool,
        children: Type.node,
        className: Type.string
    };

    prepareUserFIO = (value) => {
        if (value !== undefined) {
            let result = value.split(' ');
            if (result.length >= 3) {
                return (`${result[0]} ${result[1][0]}. ${result[2][0]}.`);
            }
        }
        return value;
    };

    constructor(props) {
        super(props);

        this.state = {
            popup: false
        };
    }

    componentDidMount() {
        if (this.props.needPopup) {
            this.hint.setTarget(this.targetBox);
        }
    }

    render(style) {
        const {
            className = style(),
            value,
            needPopup = false
        } = this.props;

        return (
            <div className={ className }>
                <div
                    className={ style('children-block') }
                    ref={ (target) => { this.targetBox = target; } }
                    onMouseEnter={ () => { this.setState({ popup: true }); } }
                    onMouseLeave={ () => { this.setState({ popup: false }); } }
                >
                    { this.prepareUserFIO(value) }
                </div>
                {
                    needPopup ?
                        <Popup
                            ref={ (popup) => { this.hint = popup; } }
                            directions={ ['bottom-center'] }
                            visible={ this.state.popup }
                            type='tooltip'
                            size='l'
                            maxWidth={ 650 }
                        >
                            { value }
                        </Popup>
                        : null
                }
            </div>
        );
    }
}

export default Person;
