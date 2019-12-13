import React from 'react';
import { Button, Divider, notification } from 'antd';

import LabelSelect from './LabelSelect';
import OperateSelect from './OperateSelect';
import TagVisual from './TagVisual';

import styles from './index.less';

class Filter extends React.Component {

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
    handleDeleteTag = (tag) => {
        this.props.handleDeleteFilter(tag);
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
        const { height } = this.props;
        return (
            <div>
                <div className={styles.header}  >
                    <h3>Filter</h3>
                </div>
                <div
                    style={{ height: `calc(100vh - ${height + 130}px)` }}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                >
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        label={this.state.label}
                        labelArray={this.props.labelArray}
                    ></LabelSelect>
                    <OperateSelect
                        handleChangeOperator={this.handleChangeOperator}
                        operator={this.state.operator}
                    ></OperateSelect>
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        label={this.state.label}
                        labelArray={this.props.labelArray}
                    ></LabelSelect>
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
                        loading={this.props.loading}
                    >
                        添加
                    </Button>
                </div>
            </div>
        );
    }
}

export default Filter;