import React from 'react';
import { Button, Divider, notification } from 'antd';

import LabelSelect from './LabelSelect';
import OperateSelect from './OperateSelect';
import TagVisual from './TagVisual';
import SummarizeLabelSelect from './SummarizeLabelSelect';

import styles from './index.less';

class Summarize extends React.Component {

    state = {
        label: undefined,
        operator: undefined,
        isMouseEnter: false,
    };

    handleAddSummarize = () => {
        const { label, operator } = this.state;
        if (label === undefined || operator === undefined) {
            notification["error"]({
                message: '错误',
                description:
                    '请填写所有项后添加条件',
            });
        }
        else {
            this.props.handleAddSummarize(label, operator);
            this.setState({
                label: undefined,
                operator: undefined,
            })
        }
    }

    //删除Filter
    handleDeleteTag = (tag) => {
        this.props.handleDeleteSummarize(tag);
    }

    handleChangeLabel = (value) => {
        this.setState({ label: value });
    }

    handleChangeOperator = (value) => {
        this.setState({ operator: value });
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
                        label={this.props.groupLabel}
                        labelArray={this.props.labelArray}
                    />
                    <Divider />
                    <OperateSelect
                        handleChangeOperator={this.handleChangeOperator}
                        operator={this.state.operator}
                    />
                    <SummarizeLabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        label={this.state.label}
                        labelArray={this.props.labelArray}
                    />
                    <Divider />
                    <TagVisual
                        handleDeleteTag={this.handleDeleteTag}
                        summarize={this.props.summarize}
                    ></TagVisual>
                </div>
                <div className={styles.footer} >
                    <Button
                        className={styles.button}
                        onClick={this.handleAddSummarize}
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