import { Component } from 'react';
import Type from 'prop-types';
import style from 'react/style';
import Popup from 'react/popup';
import './styles.css';

@style('field-value')
class FieldValue extends Component {
    static propTypes = {
        text: Type.string,
        value: Type.string,
        needPopup: Type.bool,
        children: Type.node,
        className: Type.string
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
            text,
            value,
            needPopup = false
        } = this.props;

        return (
            <div className={ className }>
                <div className={ style('text-font') }>
                    { text }
                </div>
                <div
                    className={ style('children-block') }
                    ref={ (target) => { this.targetBox = target; } }
                    onMouseEnter={ () => { this.setState({ popup: true }); } }
                    onMouseLeave={ () => { this.setState({ popup: false }); } }
                >
                    { value }
                </div>
                {
                    needPopup ?
                        <Popup
                            ref={ (popup) => { this.hint = popup; } }
                            directions={ ['bottom-center'] }
                            visible={ this.state.popup }
                            type='tooltip'
                            size='l'
                            maxWidth={ 250 }
                        >
                            { value }
                        </Popup>
                        : null
                }
            </div>
        );
    }
}

export default FieldValue;
