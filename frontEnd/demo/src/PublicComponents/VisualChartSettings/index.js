import React from 'react';
import LabelSelect from './LabelSelect';
import styles from './index.less';
import { Select, Input, Button, } from 'antd';

class Settings extends React.Component {

    state = {
      isMouseEnter: false,
      titleText: '',
    };

    handleChangeLabel = (axis, label) => {
        let chartStyle = this.props.chartStyle;
        if (axis === "x" || axis === "group") {
          if (label === '-') {
            chartStyle.xLabel = undefined;
          } else {
            chartStyle.xLabel = label;
          }

        } else {
          if (label === '-') {
            chartStyle.yLabel = undefined;
          } else {
            chartStyle.yLabel = label;
          }
        }

        this.props.handleChangeChartStyle(chartStyle);
    };

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    handleColorChange = (value) => {
      let chartStyle = this.props.chartStyle;
      chartStyle.color = value;
      this.props.handleChangeChartStyle(chartStyle);
    };
    handleTitleChange = (e) => {
      this.setState({titleText: e.target.value});
    };

    handleClickBtn = (e) => {
      this.props.handleChangeChartStyle(this.props.chartStyle, {titleText: this.state.titleText});
    };

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

            labelArray.map((item) => {
                // if (labelType[item] === type) {
                    array.push(item);
                // }
            })

            array = ['-', ...array];

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

        const colors = [
          ['粉色', ['#9e1068', '#c41d7f', '#eb2f96', '#f759ab', '#ff85c0', '#ffadd2', '#ffd6e7', '#fff0f6']],
          ['红色', ['#a8071a', '#cf1322', '#f5222d', '#ff4d4f', '#ff7875', '#ffa39e', '#ffccc7', '#fff1f0']],
          ['橙色', ['#ad4e00', '#d46b08', '#fa8c16', '#ffa940', '#ffc069', '#ffd591', '#ffe7ba', '#fff7e6']],
          ['黄色', ['#ad8b00', '#d4b106', '#fadb14', '#ffec3d', '#fff566', '#fffb8f', '#ffffb8', '#feffe6']],
          ['绿色', ['#237804', '#389e0d', '#52c41a', '#73d13d', '#95de64', '#b7eb8f', '#d9f7be', '#f6ffed']],
          ['青色', ['#006d75', '#08979c', '#13c2c2', '#36cfc9', '#5cdbd3', '#87e8de', '#b5f5ec', '#e6fffb']],
          ['蓝色', ['#0050b3', '#096dd9', '#1890ff', '#40a9ff', '#69c0ff', '#91d5ff', '#bae7ff', '#e6f7ff']],
          ['紫色', ['#391085', '#531dab', '#722ed1', '#9254de', '#b37feb', '#d3adf7', '#efdbff', '#f9f0ff']],
        ];

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

                    <Select
                      placeholder="颜色选择"
                      onChange={this.handleColorChange}
                      style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px" }}>
                      {
                        colors.map(([label, value]) => (
                          <Option value={value}>{label}</Option>
                        ))
                      }
                    </Select>

                  <Input
                    onChange={this.handleTitleChange}
                    style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px" }}
                    placeholder="输入标题" />

                  <div
                    style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px", textAlign: 'center' }}
                  >
                    <Button type="primary" onClick={this.handleClickBtn}>确定</Button>
                    <Button style={{marginLeft: '20px'}}>取消</Button>
                  </div>

                </div>
            </div>
        );
    }
}

export default Settings;
