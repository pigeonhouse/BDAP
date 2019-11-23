import React from "react"
import { Row, Col, Tabs, Button } from "antd";
import NetExperientPanel from "./NetExperientPanel"
import DataPanel from "./dataPanel.js"

/***
 * 第四个图标对应的页面NetworkPanel
 * this.props.handleClickEnter()实现页面的跳转功能，从DataPanel到NetExperientPanel
 * 点击确定按钮后clickTab为0，再次点击第四个图标clickTab为4
 * 这种跳转只能在一个图标下实现
 * info是从networktable的数据，是选中的数据
 */

class NetworkPanel extends React.Component {
    state={
        selectedInfo:null,
    }

    handleClick = (info) => {
        this.props.handleClickEnter();
        this.setState({
            selectedInfo:info,
        })
    }
    render() {
        const clickTab = this.props.clickTab;
        if (clickTab === "4") {
            return (
                <DataPanel handleClick={this.handleClick} ></DataPanel>
            )
        }
        else {
            return (<NetExperientPanel info={this.state.selectedInfo}></NetExperientPanel>)
        }
    }
}
export default NetworkPanel;