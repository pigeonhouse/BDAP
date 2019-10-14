import React from 'react';
import { Button, Modal, Tree } from 'antd';

 const { TreeNode } = Tree;

 /**
 * HDFS 文件树弹窗组件
 */
class HdfsFileTreeModal extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            // 文件树数据，格式：array<{key, title, children, isLeaf}>
            treeData: [],
        };
    }

     // 组件渲染后加载数据
    componentDidMount() {
        this.onLoadData();
    }

     /**
     * 异步加载数据
     * @param treeNode 树节点
     */
    onLoadData = treeNode => new Promise((resolve) => {
        if (treeNode && treeNode.props.children) {
            resolve();
            return;
        }
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Cookie: 'loginToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaXZ5QWRkciI6IjEwLjEwNS4yMjIuOTA6ODk5OCIsImF1ZCI6IjIwMTcyMTE1MTEiLCJzZXNzaW9uSWQiOjExMCwidXNlcklkIjoiMjAxNzIxMTUxMSJ9.2onDSv-cMXqh31MCA2tV967xU6CwrrZdNGZjZZisOrk',
            },
            credentials: 'include',
        };
        fetch(`http://localhost:8888/hdfs?oppositePath=${treeNode != null ? treeNode.props.dataRef.totalPath : '/'}`, init).then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {

                     if (res.code === 201) {
                        const data = res.data;
                        if (data) {
                            // 将多个文件对象转化为文件数组
                            const childrenTreeData = [];
                            for (const i in data) {
                                childrenTreeData.push({
                                    key: data[i].ModificationTime,
                                    title: data[i].filename,
                                    isLeaf: !data[i].isDir,
                                    totalPath:treeNode != null ? treeNode.props.title+"/"+data[i].filename:data[i].filename
                                });
                            }
                            // 如果 treeNode 不为空，说明不是第一次加载，则将 childrenTreeData 设置为 treeNode 的 children
                            if (treeNode) {
                                treeNode.props.dataRef.children = childrenTreeData;
                                this.setState({
                                    treeData: [...this.state.treeData],
                                });
                                // 否则就是第一次加载
                            } else {
                                this.setState({
                                    treeData: childrenTreeData,
                                });
                            }
                        }
                    }
                });
            }
        });
        resolve();
    })

     // 递归生成树节点
    renderTreeNodes = (data) => {
        // 保存每次生成的树节点
        const treeNodeArray = [];
        data.map((item) => {
            if (item.children) {
                treeNodeArray.push(
                    <TreeNode key={item.key} title={item.title} dataRef={item} isLeaf={item.isLeaf}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>,
                );
            } else {
                treeNodeArray.push(<TreeNode key={item.key} title={item.title} dataRef={item} isLeaf={item.isLeaf} />);
            }
        });
        return treeNodeArray;
    }
     render() {
        return (       
                <Tree loadData={this.onLoadData}onSelect={this.props.onSelect}>{this.renderTreeNodes(this.state.treeData)}</Tree>
        );
    }
}
export default HdfsFileTreeModal;