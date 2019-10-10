import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Button, Tooltip, Modal, Transfer, Divider } from 'antd';
import styles from './TransferSelect.less'

//只进行transfer的选择，拿到labelArray，选择后执行changLabelArray函数进行修改
class TransferSelect extends React.Component {

    state = {
        visible: false,
        mockData: [],
        targetKeys: [],
        preTargetKeys: [],
        tooltipsArray: [],
        tooltipVisible: false,
    }

    componentWillMount() {
        let mockData = [];
        let targetKeys = [];
        let tooltipsArray = [];
        const { labelArray } = this.props;

        //将labelArray转变为transfer所需的形式，分为mockData(存储标题和key值)，targetKeys(最后选中的key值)
        //将选中的labelArray放入tooltipsArray中将选中的列名展示。
        for (let i in labelArray) {
            mockData.push({
                key: i.toString(),
                title: labelArray[i][0],
                description: labelArray[i][0],
                chosen: labelArray[i][1]
            });
            if (labelArray[i][1] === true) {
                targetKeys.push(i.toString());
                tooltipsArray.push(labelArray[i][0]);
            }
        }

        this.setState({
            mockData,
            targetKeys,
            tooltipsArray
        });
    }

    handleOk = () => {
        let labelArray = [];
        let tooltipsArray = [];
        const mockData = this.state.mockData;
        const targetKeys = this.state.targetKeys;

        for (let i in mockData) {
            if (targetKeys.indexOf(mockData[i].key) !== -1) {
                labelArray.push([mockData[i].title, true]);
                tooltipsArray.push(mockData[i].title)
            }
            else labelArray.push([mockData[i].title, false]);
        }

        this.props.changeLabelArray(labelArray, this.props.selectLevel);
        this.setState({
            visible: false,
            tooltipsArray
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            targetKeys: this.state.preTargetKeys
        });
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    //鼠标进入Button后显示Tooptips
    handleMouseEnterTooptips = () => {
        if (this.state.tooltipsArray.length !== 0)
            this.setState({ tooltipVisible: true });
    }

    //鼠标离开Button后隐藏Tooptips
    handleMouseLeaveTooptips = () => {
        this.setState({ tooltipVisible: false });
    }

    //点击选择字段后 展示穿梭框
    handleShowTransfer = () => {
        this.setState({
            visible: true,
            preTargetKeys: this.state.targetKeys
        });
    }

    render() {
        return (
            <Fragment>
                <Tooltip
                    arrowPointAtCenter
                    visible={this.state.tooltipVisible}
                    placement="bottom"
                    title={() => {
                        return (
                            <div>
                                已选择
                                {this.state.tooltipsArray.map((item) => {
                                    return <Divider style={{ color: '#fff', margin: '8px 0' }}>{item}</Divider>
                                })}
                            </div>
                        );
                    }}
                    overlayClassName={styles.divider}
                    mouseLeaveDelay="0.1"
                >
                    <Button style={{ width: '100%', marginBottom: '10px' }} onClick={this.handleShowTransfer}
                        onMouseEnter={this.handleMouseEnterTooptips} onMouseLeave={this.handleMouseLeaveTooptips}
                        mouseLeaveDela={0.01}
                    >选择字段</Button>
                </Tooltip>
                <Modal title="选择字段" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    destroyOnClose={true}
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
                            listStyle={{ textAlign: 'left' }}
                        />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default withPropsAPI(TransferSelect);