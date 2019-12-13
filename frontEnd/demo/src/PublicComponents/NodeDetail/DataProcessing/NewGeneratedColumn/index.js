import React, { Component } from 'react';
import { Form, Input, AutoComplete, Tooltip } from 'antd';
import { withPropsAPI } from '@src';
import { logical } from './logicTest';
import "./index.less";

var selectKeyWord = null;
var inputString = undefined;

class NewGeneratedColumn extends Component {
    state = {
        dataSource: [],
        errorInfo: null,
        value: null,
    }

    onSearch = () => {
        const cursorPosition = this.getCursorPosition();
        const { dataSource } = logical(inputString.substr(0, cursorPosition));

        this.setState({ dataSource });
    };

    onChange = value => {
        const cursorPosition = this.getCursorPosition();

        if (selectKeyWord !== null) {
            const oldValue = inputString;
            const left = oldValue.substr(0, cursorPosition);
            const right = oldValue.substr(cursorPosition, oldValue.length - cursorPosition + 1);
            inputString = left + value + right;

            this.setState({ value }, () => {
                var cursorIndex = 0;
                if (value.indexOf('(') !== -1) {
                    cursorIndex = value.indexOf('(') + left.length + 1;
                } else {
                    cursorIndex = left.length + value.length;
                }
                this.setCursorPosition(cursorIndex);
            });
        } else {
            inputString = value;
            this.onSearch();
            this.setState({ value })
        }

        console.log(inputString);

        selectKeyWord = null;

        if (inputString !== undefined) {
            const { dataSource } = logical(inputString.substr(0, cursorPosition));
            this.setState({ dataSource });
        }
        const { errorInfo } = logical(inputString);
        this.setState({ errorInfo });
    };

    onFocus = () => {
        const cursorPosition = this.getCursorPosition();

        if (inputString !== undefined) {
            const { dataSource } = logical(inputString.substr(0, cursorPosition));
            this.setState({ dataSource });
        }
    }

    getCursorPosition = () => {
        var oTxt = document.getElementById("text");
        var cursorPosition = 0;
        if (oTxt.selectionStart) {
            cursorPosition = oTxt.selectionStart;
        } else if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange();
            range.moveStart("character", -oTxt.value.length);
            cursorPosition = range.text.length;
        }
        return cursorPosition;
    }

    setCursorPosition = (index) => {
        const elem = document.getElementById("text");
        var val = elem.value;
        var len = val.length;

        if (len < index) return;

        elem.focus()
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len);
            range.moveEnd("character", -len);
            range.moveStart("character", index);
            range.moveEnd("character", 0);
            range.select();
        }
    }

    onSelect = (value) => {
        selectKeyWord = value;
    }

    render() {
        const { dataSource, errorInfo } = this.state;
        return (
            <Tooltip title={errorInfo}>
                <Form>
                    <Form.Item
                        validateStatus={errorInfo ? "error" : null}
                    >
                        <AutoComplete
                            style={{ width: "100%" }}
                            onSelect={this.onSelect}
                            value={inputString}
                            onChange={this.onChange}
                            dataSource={dataSource}
                            onFocus={this.onFocus}
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={false}
                            dropdownStyle={{ width: 300 }}
                            dropdownMenuStyle={{ width: 1000 }}
                            optionLabelProp="value"
                        >
                            <Input
                                id="text"
                                value={inputString}
                                onClick={this.onFocus}
                                autoComplete="off"
                            />
                        </AutoComplete>
                    </Form.Item>
                </Form>
            </Tooltip>
        )
    }
}
export default Form.create()(withPropsAPI(NewGeneratedColumn));