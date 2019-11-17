import React from 'react';
import { Tooltip, Input } from 'antd';

const { Search } = Input;

class SearchFile extends React.Component {

    state = {
        value: null,
        fileBackup: [],
    }

    //输入框的搜索
    handleRearch = (searchText) => {
        const { status, fileList } = this.props;
        var fileBackup = this.state;

        // 如果当前状态不为search，说明是第一次点击search，需要设置search，修改fileBackup
        if (status !== 'search') {
            fileBackup = fileList.map(r => r);
            this.setState({ fileBackup });
        }

        this.setState({ value: searchText });
        this.updateFileList(fileBackup, searchText);
    }

    // 更新父组件的FileList
    updateFileList = (fileBackup, value) => {
        const { updateAttributes } = this.props;
        const reg = new RegExp(value, 'gi');

        const attributes = {
            fileList: fileBackup.map((record) => {
                const match = record.fileName.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                };
            }).filter(record => !!record),
            status: 'search'
        };

        updateAttributes(attributes);
    }

    inputChange = (e) => {
        this.setState({ value: e.target.value });
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    // 当当前页面的文件列表改变时，若正处于search阶段，则update fileBackup
    updateFileBackup = (fileList) => {
        this.setState({
            fileBackup: fileList
        })
        this.updateFileList(fileList, this.state.value);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== null && nextProps.status !== 'search') {
            this.setState({ value: null, fileBackup: [] });
        }
    }

    render() {
        return (
            <Tooltip placement="bottom" title="查询文件或文件夹" >
                <Search
                    placeholder="请输入文件名"
                    onSearch={this.handleRearch}
                    onChange={this.inputChange}
                    value={this.state.value}
                    style={{ width: "100%", marginTop: "35px" }}
                    enterButton
                />
            </Tooltip>
        )
    }
}

export default SearchFile;