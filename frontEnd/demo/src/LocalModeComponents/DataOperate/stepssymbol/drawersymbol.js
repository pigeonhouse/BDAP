import React, { Component } from 'react'
import { Drawer, Radio } from 'antd'
import {StepsSymbol} from './stepssymbol'
const RadioGroup = Radio.Group;
class DrawerSymbol extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render(){
        return (
            <Drawer
                title="执行进度"
                placement="bottom"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                >
                <StepsSymbol stream={this.props.stream}></StepsSymbol>
            </Drawer>
        );
    }
}
export default DrawerSymbol;
