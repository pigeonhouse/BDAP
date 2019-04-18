import React, { Component } from 'react'
import { Steps, Drawer, Radio } from 'antd'
const Step = Steps.Step;
const RadioGroup = Radio.Group;
class StepsSymbol extends Component{
    constructor(props){
        super(props);
        this.state={
            children,
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
    componentWillMount(){
        const stream = this.props.stream;
        let children = new Array();
        for(let i in stream){
            children.push(<Step title={stream[i].label} status='wait' />)
        }
        this.setState({
            children:children
        })
    }
    componentWillUpdate(){

    }
    render(){
        return (

            <Steps>
                {this.state.children}
            </Steps>
        );
    }
}
export default StepsSymbol;
