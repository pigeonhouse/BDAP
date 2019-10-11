import React from 'react';
import LabelSelect from './LabelSelect';
import styles from './index.less';

class Settings extends React.Component {

    state = {
        x_label: undefined,
        y_label: undefined,
        isMouseEnter: false,
    };

    handleChangeLabel = (axis, label) => {

        if(axis === 'x'){
            this.setState({ x_label: label })
        }
        else {
            this.setState({ y_label: label })
        }

        this.props.handleChangeChartStyle(axis, label)
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        return (
            <div>
                <div className={styles.header} >
                    <h3>Settings</h3>
                </div>
                <div
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                >
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        axis='x'
                        label={this.state.x_label}
                        labelArray={this.props.labelArray}
                    ></LabelSelect>
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        axis='y'
                        label={this.state.y_label}
                        labelArray={this.props.labelArray}
                    ></LabelSelect>
                </div>
            </div>
        );
    }
}

export default Settings;