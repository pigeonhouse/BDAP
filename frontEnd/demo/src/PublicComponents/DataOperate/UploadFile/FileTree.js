import { TreeSelect } from 'antd';
import React from 'react';

const { TreeNode } = TreeSelect;

class FileTree extends React.Component {
    state = {
        value: undefined,
        treeData: [
            { title: 'Expand to load', key: '0', value: 'Expand to load' },
            { title: 'Expand to load', key: '1', value: 'Expand to load' },
            { title: 'Tree Node', key: '2', value: 'Expand to load', isLeaf: true },
        ],
    };

    onLoadData = treeNode =>
        new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                treeNode.props.dataRef.children = [
                    { title: 'Child Node', key: `${treeNode.props.eventKey}-0`, value: 'Child Node' },
                    { title: 'Node', key: `${treeNode.props.eventKey}-1`, value: 'Node', isLeaf: true },
                ];
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
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
        this.setState({ value });
    };

    render() {
        const { treeData } = this.state;
        return (
            <TreeSelect
                allowClear
                style={{ width: "100%" }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择路径"
                treeDefaultExpandAll
                onChange={this.onChange}
                loadData={this.onLoadData}
            >
                {this.renderTreeNodes(treeData)}
            </TreeSelect>
        );
    }
}
export default FileTree;