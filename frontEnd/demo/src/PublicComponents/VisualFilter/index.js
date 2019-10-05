import React from 'react';
import { Button } from 'antd';

import LabelSelect from './labelSelect.js';
import OperateSelect from './operateSelect.js';
import TagVisual from './tagVisual.js';
import InputValue from './inputValue.js';

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
        this.props.handleAddFilter(label, operator, value);
        this.setState({
            label: undefined,
            operator: undefined,
            value: undefined,
        })
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
                    <h3>Filter</h3>
                </div>
                <div
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                >
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        label={this.state.label}
                    ></LabelSelect>
                    <OperateSelect
                        handleChangeOperator={this.handleChangeOperator}
                        operator={this.state.operator}
                    ></OperateSelect>
                    <InputValue
                        handleChangeValue={this.handleChangeValue}
                    ></InputValue>
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

export default Filter;