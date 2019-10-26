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
          ['粉色', [ '#EE008F','#FF0099','#FF33AD','#FF55BB','#FF77C9','#FF88CF','#FF99D6','#FFAADD','#FFCCEB','#FFDDF1','#FFEEF8'],['#FF33AD']],
          ['红色', [ '#CE0F0F','#DE1010','#EF2121','#F14141','#F46060','#F68080','#F79090','#F9B0B0','#FAC0C0','#FCCFCF','#FDDFDF'],['#EF2121']],
          ['橙色', [ '#D65A08','#E76108','#F67219','#F87C2A','#F9863A','#FA9A5B','#FBAE7C','#FCC39D','#FCCDAD','#FDD7BD','#FDE1CE'],['#F67219']],
          ['黄色', [ '#D6D608','#F7F709','#F8F819','#F9F93A','#F9F94B','#FAFA5B','#FAFA6B','#FBFB7C','#FCFC9D','#FDFDBD','#FDFDCE'],['#F8F819']],
          ['绿色', [ '#07C607','#08D608','#09F709','#2AF82A','#3AF93A','#4BF94B','#5BFA5B','#7CFB7C','#9DFC9D','#BDFDBD','#CEFDCE'],['#09F709']],
          ['青色', [ '#08ACD6','#08BAE7','#19CBF8','#19CBF8','#3AD2F9','#4BD6F9','#6BDDFA','#7CE1FB','#8CE5FB','#ADECFC','#CEF4FD'],['#19CBF8']],
          ['蓝色', [ '#085AD6','#0861E7','#0968F7','#2A7CF8','#3A86F9','#4B90F9','#6BA4FA','#7CAEFB','#8CB9FB','#ADCDFC','#CEE1FD'],['#0968F7']],
          ['紫色', [ '#8308D6','#8D08E7','#9E19F8','#AC3AF9','#BA5BFA','#C16BFA','#C87CFB','#CE8CFB','#D59DFC','#E3BDFD','#F1DEFE'],['#9E19F8']],
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
