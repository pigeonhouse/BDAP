import React, {Component} from 'react';
import { Button, Modal, Transfer } from 'antd'
class Selectword extends Component{
    constructor(props){
        super(props);
    }
    state = {
        visible: false,
        mockData: [{
            key: '1',
            title: `content`,
            description: `description of content`,
            chosen: true,
          }],
        targetKeys: ['1'],
    }
    displayTransfer = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    
    handleCancel = (e) => {
        console.log(e);
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

    render(){
        return (
            <div>
                <Button onClick={this.displayTransfer}>selectword</Button>

                <Modal title="Selectword" visible={this.state.visible}
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

export default Selectword;
