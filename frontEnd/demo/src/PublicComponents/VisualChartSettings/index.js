import React from 'react';
import LabelSelect from './LabelSelect';
import styles from './index.less';

class Settings extends React.Component {

    state = {
        isMouseEnter: false,
    };

    handleChangeLabel = (axis, label) => {
        let chartStyle = this.props.chartStyle;
        if (axis === "x" || axis === "group") {
            chartStyle.xLabel = label;
        } else {
            chartStyle.yLabel = label;
        }

        this.props.handleChangeChartStyle(chartStyle);
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        const { chartSettings, currentChart, labelArray, labelType, chartStyle } = this.props;
        if (currentChart === "table") return <div></div>;
        let children = [];
        const settings = chartSettings[currentChart] || {};

        for (let i in Object.keys(settings)) {
            const setting = settings[Object.keys(settings)[i]];
            const { name, type } = setting;
            let array = new Array();
            let label = null;

            labelArray.map((item, index) => {
                if (labelType[index] === type) {
                    array.push(item);
                }
            })

            if (name === "x" || name === "group") {
                label = chartStyle.xLabel;
            } else {
                label = chartStyle.yLabel;
            }

            children.push(
                <LabelSelect
                    handleChangeLabel={this.handleChangeLabel}
                    axis={name}
                    label={label}
                    labelArray={array}
                ></LabelSelect>
            )
        }

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
                    {children}
                </div>
            </div>
        );
    }
}

export default Settings;