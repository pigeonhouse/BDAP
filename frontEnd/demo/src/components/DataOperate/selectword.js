import React, {Component} from 'react';
import { Button, Modal, Transfer } from 'antd'
import { withPropsAPI } from '@src';
import FeatureRegion from './FeatureRegion.js'
import FeatureGroup from './FeatureGroup.js'
import FeatureBinary from './FeatureBinary.js'
class Selectword extends Component{
    constructor(props){
        super(props);
    }
    state = {
        visible: false,
        mockData: [],
        targetKeys: [],
        labelArray: []
    }
    
    displayTransfer = () => {
        const { propsAPI } = this.props;
        const { find, getSelected } = propsAPI;
        var item = getSelected()[0];
        var labelArray = [];
        if(item.model.select_status > 1 && item.model.labelArray[this.props.index].length !== 0){
            labelArray = item.model.labelArray[this.props.index];
        }
        else if(item.model.select_status === 1 && item.model.labelArray.length !== 0){
            labelArray = item.model.labelArray;
        }
        else {
            item = find(this.props.id);
            if(item.model.select_status > 1){
                let tail = item.model.labelArray.length-1;
                for(var i in item.model.labelArray[tail])
                    labelArray.push([item.model.labelArray[tail][i][0], false]);
            }
            else {
                for(var i in item.model.labelArray)
                    labelArray.push([item.model.labelArray[i][0], false]);
            }
        }
        let mockdata = [];
        let targetkeys = [];
        for(var i in labelArray){
            mockdata.push({
                key: i.toString(),
                title: labelArray[i][0],
                description: labelArray[i][0],
                chosen: labelArray[i][1]
            });
            if(labelArray[i][1])
            targetkeys.push(i.toString());
        }
        this.setState({
            visible: true,
            mockData: mockdata,
            targetKeys: targetkeys
        });
    }

    handleOk = () => {
        const { propsAPI } = this.props;
        const { executeCommand, update, getSelected} = propsAPI;
        const item = getSelected()[0];
        let labelArray = [];
        const mockdata = this.state.mockData;
        const targetKeys = this.state.targetKeys;
        for(let i in mockdata){
            if(targetKeys.indexOf(mockdata[i].key) !== -1){
                labelArray.push([mockdata[i].title, true]);
            }
            else labelArray.push([mockdata[i].title, false]);
        }
        let labelarray = [];
        if(item.model.select_status > 1)
        {
            labelarray = JSON.parse(JSON.stringify(item.model.labelArray))
            labelarray[this.props.index] = labelArray;
        }
        else {
            labelarray = labelArray;
        }
        const values = {labelArray:labelarray};
        executeCommand(()=>{
            update(item, {
                ...values
            })
        })
        console.log(propsAPI.save())
        this.setState({
            visible: false,
            labelArray: labelarray
        });
    }
    
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    isSelect=()=>{
        if(this.props.id === 0)
        return (<div><Button disabled style={{width:180}}>选择字段</Button><br /><br /></div>)
        else return (<div><Button onClick={this.displayTransfer} style={{width:180}}>选择字段</Button><br /><br /></div>)

    }
    featuresOperate=()=>{
        if(this.props.label === '特征区间化')
        return <FeatureRegion 
                labelArray={this.state.labelArray}
                ></FeatureRegion>
        else if(this.props.label === '特征分组归类')
        return <FeatureGroup
                labelArray={this.state.labelArray}
                ></FeatureGroup>
        else if(this.props.label === '特征二进制化')
        return <FeatureBinary
                labelArray={this.state.labelArray}
                ></FeatureBinary>
    }
    render(){
        return (
            <div>
                {this.isSelect()}
                {this.featuresOperate()}
                <Modal title="选择字段" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    style={{}}
                >
                    <div  style={{textAlign: 'center'}}>
                        <Transfer
                            dataSource={this.state.mockData}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={this.state.targetKeys}
                            onChange={this.handleChange}
                            onSearch={this.handleSearch}
                            render={item => item.title}
                            listStyle={{
                                textAlign: 'left'
                            }}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withPropsAPI(Selectword);
