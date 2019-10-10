import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Button, Tooltip, Modal, Transfer, Divider } from 'antd';
import { findSourceColumnsInfo } from './FindSourceColumnsInfo';
import { findLabelArray } from './FindLabelArray';
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
        sourceColumnsInfo: [],
    }

    componentWillMount() {
        const { item, attribute, propsAPI } = this.props;
        let mockData = [];
        let targetKeys = [];
        let tooltipsArray = [];

        // 拿到sourceColmnsInfo，再去查看attribute.value是否选中了早已更改的label，若有则删除
        const sourceColumnsInfo = findSourceColumnsInfo(item, attribute.style.sourceAnchor, propsAPI);
        const labelArray = findLabelArray(attribute, sourceColumnsInfo);

        //将labelArray转变为transfer所需的形式，分为mockData(存储标题和key值)，targetKeys(最后选中的key值)
        //将选中的labelArray放入tooltipsArray中将选中的列名展示。
        for (let column in sourceColumnsInfo) {
            const { colName } = sourceColumnsInfo[column];
            let selected = false;

            //若labelArray中存在colName，那么将加入targetKeys中设为已选择
            if (labelArray.includes(colName)) {
                selected = true;
                targetKeys.push(colName);
                tooltipsArray.push(colName);
            }
            mockData.push({
                key: colName,
                title: colName,
                description: colName,
                chosen: selected
            });
        }

        this.setState({
            mockData,
            targetKeys,
            tooltipsArray,
            sourceColumnsInfo,
        });
    }

    handleOk = () => {
        let labelArray = [];
        let tooltipsArray = [];
        const { sourceColumnsInfo, mockData, targetKeys } = this.state;

        // 生成columnsInfo
        mockData.map((mock) => {

            //不存在则返回
            if (!targetKeys.includes(mock.key)) return;

            //存在则加入labelArray及tooltipsArray，并加入columnsInfo
            tooltipsArray.push(mock.title);
            labelArray.push(mock.title);

        });

        this.props.changeLabelArray(labelArray, this.props.index, sourceColumnsInfo);
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
        const { attribute } = this.props;
        return (
            <Fragment>
                <p>{attribute.labelName.label}:</p>
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