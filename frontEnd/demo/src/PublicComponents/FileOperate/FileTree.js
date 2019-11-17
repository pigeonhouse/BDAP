import { TreeSelect } from 'antd';
import React from 'react';

import { fetchTool } from '../../FetchTool';

const { TreeNode } = TreeSelect;
const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
};

class FileTree extends React.Component {
    state = {
        value: undefined,
        treeData: [],
    };

    componentWillMount() {
        const { defaultValue } = this.props;
        this.setState({
            treeData: this.props.treeData,
            value: defaultValue,
        })
    }

    onLoadData = treeNode =>
        new Promise(async resolve => {
            // if (treeNode.props.children) {
            //     resolve();
            //     return;
            // }

            const url = `/filesystem-service/ls?path=/${treeNode.props.value}`;

            const response = await fetchTool(url, init);
            if (response.status === 200) {
                const treeData = await response.json() || [];
                treeNode.props.dataRef.children = [];

                treeData.map((data, index) => {
                    if (data.isDir !== true) return;

                    treeNode.props.dataRef.children.push({
                        title: data.fileName,
                        key: `${treeNode.props.eventKey}-${index}`,
                        value: `${treeNode.props.value}${data.fileName}/`
                    })
                })

                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }
        });

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} value={item.value} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });

    onChange = (value) => {
        value = '/' + value;
        this.setState({ value });
        this.props.handleSelectPath(value);
    };

    render() {
        const { treeData, value } = this.state;

        return (
            <TreeSelect
                allowClear
                placeholder="请选择路径"
                style={{ width: "100%" }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                onChange={this.onChange}
                loadData={this.onLoadData}
            >
                {this.renderTreeNodes(treeData)}
            </TreeSelect>
        );
    }
}
export default FileTree;