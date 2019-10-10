import React, { Component, Fragment } from 'react';
import { withPropsAPI } from '@src';

import { changeSourceLabelArray } from './ChangeSourceLabelArray.js';
import TransferSelect from './TransferSelect.js';
// import Feature from '../../DataOperate/FeatureNodeDetail/Feature';

/**
 * 选择字段组件
 * 对labelArray进行选择，即选择字段
 */

class SelectWord extends Component {
    state = {
        labelArray: []
    }

    //渲染时寻找上一个的labelArray，符合条件时才会渲染选择字段按钮，并且查找labelArray
    componentWillMount() {
        const { labelName, anchor, groupName } = this.props.item.getModel();
        const { label } = labelName;
        const group = groupName.label;

        if (group === 'datasource' || anchor[0] === 0 || label === "数据随机划分") return;

        this.findLabelArray();
    }

    //寻找上一个labelArray，并根据当前item的组别将labelArray修改为不同的情况，且根据labelArray的来源修改可选择的字段
    // 若为ml则labelArray结构为[[内部存放特征列的选择结果],[内部存放目标列的选择结果]]
    // 否则labelArray结构为[选择字段的结果]
    findLabelArray = () => {
        const { item } = this.props;
        const { groupName } = item.getModel();
        //拿到groupName
        const group = groupName.label;
        let labelArray = this.findLabelArrayFunction(item.id, group);

        //检查labelArray是否已更换
        this.isLabelArrayChange(labelArray, item.getModel().labelArray, group);
    }

    //递归寻找目标Id的上方锚点所连接的非"数据随机划分"的item
    findLabelArrayFunction = (currentId, group) => {
        const { propsAPI } = this.props;
        const { find, save } = propsAPI;
        const edges = save().edges;
        const currentItem = find(currentId);

        for (let i in edges) {
            if ((currentItem.model.group === "machinelearning" && edges[i].target === currentId && edges[i].targetAnchor === 1) ||
                (currentItem.model.group !== "machinelearning" && edges[i].target === currentId)) {
                const sourceItem = find(edges[i].source);

                if (sourceItem.getModel().label === "数据随机划分")
                    return this.findLabelArrayFunction(sourceItem.id, group);

                let labelArray = changeSourceLabelArray(sourceItem, sourceItem.model.labelArray);

                if (group === 'machinelearning')
                    return [labelArray, labelArray] || [[], []];
                else return labelArray || [];
            }
        }
        if (group === 'machinelearning')
            return [[], []];
        else return [];
    }

    // 检查labelArray是否已更换，未更换则使用过去的labelArray不变，否则更换为新的labelArray
    isLabelArrayChange = (labelArray, currentLabelArray, group) => {
        //分情况确定是否为空
        if (currentLabelArray.length === 0 ||
            (group !== 'machinelearning' && labelArray.length === 0) ||
            (group === 'machinelearning' && (labelArray[0].length === 0 || currentLabelArray[0].length === 0))) {

            const { propsAPI, item } = this.props;
            const { executeCommand, update } = propsAPI;
            executeCommand(() => {
                update(item, { labelArray });
            });
            this.setState({ labelArray });
            return;
        }
        if (group === 'machinelearning') {
            for (let column in labelArray) {
                if (labelArray[0][column][0] !== currentLabelArray[0][column][0]) {
                    this.setState({ labelArray });
                    return;
                }
                else if (labelArray[1][column][0] !== currentLabelArray[1][column][0]) {
                    this.setState({ labelArray });
                    return;
                }
            }
        }
        else {
            for (let column in labelArray) {
                if (labelArray[column][0] !== currentLabelArray[column][0]) {
                    this.setState({ labelArray });
                    return;
                }
            }
        }
        this.setState({ labelArray: currentLabelArray });
    }

    // 根据selectLevel进行对labelArray的改变
    // 0为group为 ‘ml’ 的item中labelArray的特征列选择结果
    // 1为group为 ‘ml’ 的item中labelArray的特目标列选择结果
    // 2为group为 其他 的item中labelArray的选择结果
    changeLabelArray = (array, selectLevel) => {
        const { propsAPI, item } = this.props;
        const { executeCommand, update } = propsAPI;
        let labelArray = this.state.labelArray;
        switch (selectLevel) {
            case '0': labelArray[0] = array; break;
            case '1': labelArray[1] = array; break;
            case '2': labelArray = array; break;
        }
        executeCommand(() => {
            update(item, {
                labelArray: labelArray
            });
        });
        this.setState({ labelArray });
    }

    //根据group确定选择字段按钮的个数，并返回相应的组件
    //如果group为ml那么将有两个选择字段分别选择特征列及目标列，否则为1个选择字段
    createSelect = () => {
        const item = this.props.item;
        const model = item.getModel();
        const { groupName, anchor, labelName } = model;
        //拿到label和groupName
        const { label } = labelName;
        const group = groupName.label;

        if (group === 'datasource' || anchor[0] === 0 || label === "数据随机划分") return;

        const labelArray = this.state.labelArray;

        if (group === 'machinelearning') {
            return (
                <Fragment>
                    特征列字段：
                    <TransferSelect labelArray={labelArray[0]} selectLevel="0" changeLabelArray={this.changeLabelArray}></TransferSelect>
                    目标列字段：
                    <TransferSelect labelArray={labelArray[1]} selectLevel="1" changeLabelArray={this.changeLabelArray}></TransferSelect>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    选择字段:
                    <TransferSelect labelArray={labelArray} selectLevel="2" changeLabelArray={this.changeLabelArray}></TransferSelect>
                </Fragment>
            );
        }
    }

    render() {
        return (
            <Fragment>
                {this.createSelect()}

                {/* 有关预处理的函数 */}
                {/* <Feature item={this.props.item} labelArray={this.state.labelArray} /> */}
            </Fragment>
        );
    }
}

export default withPropsAPI(SelectWord);
