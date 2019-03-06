import { Button, Modal, Transfer } from 'antd'
import React, {Component} from 'react';
import { withPropsAPI } from '@src';

class Select extends React.Component {
    constructor(props){
        super(props);
    }
    state = {
        visible: true,
        mockData: [],
        targetKeys: [],
    }

    displayTransfer = () => {
        this.getMock();
    }

    handleOk = () => {
        console.log("this.state.targetKeys");
        console.log(this.state.targetKeys);
        this.props.re.renew(this.state.targetKeys);
        this.setState({
            visible: false,
        });
    }
    handleVisible = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    componentDidMount(){
        this.getMock();
    }
  getMock = () => {
    let mockdata = [];
    const data = this.props.data;
    for(let i in data){
        mockdata.push({
            key: i.toString(),
            title: data[i][0].label,
            description: data[i][0].label
        });
    }
    this.setState({
        visible: true,
        mockData: mockdata,
    });
  }

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

  handleChange = (targetKeys) => {
      if(targetKeys.length <= this.props.amount){
        this.setState({ targetKeys });
      }
      else alert('You can only chose '+this.props.amount+' set of data');
  }

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  render() {
    return (
        <div>
            <Button onClick = {this.handleVisible}>Select</Button>
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

export default Select;