import React from 'react';
import { Button, Divider, notification } from 'antd';

import LabelSelect from './LabelSelect';
import OperateSelect from './OperateSelect';
import TagVisual from './TagVisual';
import InputValue from './InputValue';

import styles from './index.less';

class Summarize extends React.Component {

    state = {
        label: undefined,
        operator: undefined,
        value: undefined,
        isMouseEnter: false,
    };

    handleAddFilter = () => {
        const { label, operator, value } = this.state;
        if (label === undefined || operator === undefined || value === undefined) {
            notification["error"]({
                message: '错误',
                description:
                    '请填写所有项后添加条件',
            });
        }
        else {
            this.props.handleAddFilter(label, operator, value);
            this.setState({
                label: undefined,
                operator: undefined,
                value: undefined,
            })
        }
    }

    //删除Filter
    handleDeleteTag = (index) => {
        this.props.handleDeleteFilter(index);
    }

    handleChangeLabel = (value) => {
        this.setState({ label: value });
    }

    handleChangeOperator = (value) => {
        this.setState({ operator: value });
    }

    handleChangeValue = (value) => {
        this.setState({ value });
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        return (
            <div>
                <div className={styles.header} >
                    <h3>Summarize</h3>
                </div>
                <div
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                >
                    <LabelSelect
                        handleChangeGroupLabel={this.props.handleChangeGroupLabel}
                        label={this.state.label}
                        labelArray={this.props.labelArray}
                    ></LabelSelect>
                    <OperateSelect
                        handleChangeOperator={this.handleChangeOperator}
                        operator={this.state.operator}
                    ></OperateSelect>
                    <InputValue
                        handleChangeValue={this.handleChangeValue}
                        value={this.state.value}
                    ></InputValue>
                    <Divider />
                    <TagVisual
                        handleDeleteTag={this.handleDeleteTag}
                        filter={this.props.filter}
                    ></TagVisual>
                </div>
                <div className={styles.footer} >
                    <Button
                        className={styles.button}
                        onClick={this.handleAddFilter}
                        type="primary"
                    >
                        添加
                    </Button>
                </div>
            </div>
        );
    }
}

export default Summarize;