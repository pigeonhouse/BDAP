import React, {Component} from 'react';
import { Button, Modal, Transfer } from 'antd'
import { withPropsAPI } from '@src';
import Feature from './Feature.js'
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
    featuresOperate=(label)=>{
        if(label === '特征区间化' 
        || label === '特征分组归类')
        return <Feature
                    label={label}
                    labelArray={this.state.labelArray}
                ></Feature>
        else if(label === '特征二进制化'){
            const { propsAPI } = this.props;
            const { getSelected, executeCommand, update } = propsAPI;
            const item = getSelected()[0];
            let labelArray = [];
            for(let i in this.state.labelArray){
                if(this.state.labelArray[i][1]){
                    labelArray.push(this.state.labelArray[i][0])
                }
            }
            const attr = {attr: labelArray};
            console.log(attr)
            executeCommand(()=>{
                update(item, {...attr})
            })
        }
    }
    isChange=(labelA, labelB)=>{
        if(!labelA || !labelB || labelA.length != labelB.length) return true;
        for(let i in labelA){
            if(labelA[i][0] !== labelB[i][0])
                return true;
        }
        return false;
    }
    findSourceLabel=(item)=>{
        if(item.model.anchor[0] === 1 || !item.model.anchor[0])
            return item.model.labelArray.public?item.model.labelArray.public:[];
        else if(item.model.anchor[0] === 2){
            return [...item.model.labelArray.text_x,...item.model.labelArray.text_y];
        }
    }
    changelabelArray=(labelA, labelB)=>{
        if(this.isChange(labelA, labelB)){
            let labelArray = [];
            for(let i in labelB){
                labelArray.push([labelB[i][0], false]);
            }
            return labelArray?labelArray:[];
        }
        else return labelA?labelA:[];
    }
    displayTransfer = () => {
        const { propsAPI } = this.props;
        const { find, getSelected } = propsAPI;
        var item = getSelected()[0];
        var sourceitem = find(this.props.sourceid);
        var labelArray = [];
        const sourcelabel = this.findSourceLabel(sourceitem);
        if(item.model.anchor[0] === 1){
            labelArray = this.changelabelArray(item.model.labelArray.public, sourcelabel)
        }
        else if(item.model.anchor[0] === 2){
            switch(this.props.index){
                case 0:
                    labelArray = this.changelabelArray(item.model.labelArray.train_x, sourcelabel)
                    break;
                case 1:
                    labelArray = this.changelabelArray(item.model.labelArray.train_y, sourcelabel)
                    break;
                case 2:
                    labelArray = this.changelabelArray(item.model.labelArray.text_x, sourcelabel)
                    break;
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
        if(item.model.anchor[0] === 2)
        {
            labelarray = JSON.parse(JSON.stringify(item.model.labelArray))
            switch(this.props.index){
                case 0:
                    labelarray.train_x = labelArray;
                    break;
                case 1:
                    labelarray.train_y = labelArray;
                    break;
                case 2:
                    labelarray.text_x = labelArray;
                    break;
            }
        }
        else if(item.model.anchor[0] === 1){
            labelarray = JSON.parse(JSON.stringify(item.model.labelArray));
            labelarray.public = labelArray;
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
            labelArray: labelArray
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
        if(this.props.sourceid === 0)
        return (<Button style={{width:'100%'}} disabled>选择字段</Button>)
        else return <Button style={{width:'100%'}} onClick={this.displayTransfer}>选择字段</Button>
    }
    render(){
        return (
            <div>
                {this.isSelect()}
                {this.featuresOperate(this.props.label)}
                <Modal title="选择字段" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    style={{}}
                >
                    <div style={{textAlign:'center'}}>
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
