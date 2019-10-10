import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';

import HdfsFile from '../../DataOperate/FileOperate/HdfsFile';
import ExampleDataUpload from '../../DataOperate/FileOperate/ExampleDataUpload';

import { fetchTool } from '../../../FetchTool';

/**
 * get输入文件
 * @param {String} label
 * @param {String} group
 */

class GetInputOutput extends React.Component {
    // 检测是否为Input，Output Item，分为三种情况
    // 如果为本地数据或HDFS数据，则返回这两种组件，分别等待上传和回传数据
    // 如果为已提供的数据，则将数据上传至Item内，并修改Item右侧标志为已上传
    // 非以上情况则向后端请求数据，得到回传后上传至Item，并进行修改右侧标志
    isInputOutput = () => {
        const { label, group } = this.props;
        if (label === 'hdfs数据') return (<HdfsFile />);
        else if (group === 'datasource') {
            switch (label) {
                case 'Titanic测试': case 'Titanic训练': case 'Pokemon':
                case 'SimpleTest': case 'SimpleTrain': return (<ExampleDataUpload fileName={label} />);
                default:
                    const { propsAPI } = this.props;
                    const { getSelected } = propsAPI;
                    const item = getSelected()[0];
                    const model = item.getModel();
                    const init = {
                        method: 'POST',
                        body: "fileName=" + model.label,
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                        },
                    }

                    // const respData = await fetchTool();

            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.isInputOutput()}
            </Fragment>
        );
    }
}

export default withPropsAPI(GetInputOutput);
