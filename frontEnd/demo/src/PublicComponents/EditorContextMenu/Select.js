import { Button, Modal, Transfer, notification } from 'antd'
import React from 'react';

class Select extends React.Component {
    constructor(props) {
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
        this.props.re.renew(this.state.targetKeys);
        this.setState({
            visible: false,
        });
        this.props.trans();
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
    componentDidMount() {
        this.getMock();
    }
    getMock = () => {
        let mockdata = [];
        const data = this.props.data;
        for (let i in data) {
            mockdata.push({
                key: i.toString(),
                title: data[i].label,
                description: data[i].label
            });
        }
        this.setState({
            visible: true,
            mockData: mockdata,
        });
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    handleChange = (targetKeys) => {
        if (targetKeys.length <= this.props.amount_max && targetKeys.length >= this.props.amount_min) {
            this.setState({ targetKeys });
        }
        else if (targetKeys.length < this.props.amount_min) { alert('You can chose at least ' + this.props.amount_min + ' set of data') }
        else alert('You can chose at most ' + this.props.amount_max + ' set of data');
    }

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    componentWillMount() {
        notification['info']({
            message: '选择提示',
            description: '将需要展示数据的字段从左方框移到右方框，移过去的第一个字段作x轴，余下的字段作y轴',
        });
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleVisible}>Select</Button>
                <Modal title="选择字段" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    style={{}}
                >
                    <div style={{ textAlign: 'center' }}>
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