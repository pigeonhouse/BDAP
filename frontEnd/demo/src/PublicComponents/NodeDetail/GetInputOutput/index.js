import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';

import UploadFile from '../../DataOperate/FileOperate/UploadFile';
import HdfsFile from '../../DataOperate/FileOperate/HdfsFile';
import ExampleDataUpload from '../../DataOperate/FileOperate/ExampleDataUpload';
import { Stat } from '../../DataOperate/DataToolFunctions/Stat';

import Papa from 'papaparse';

/**
 * get输入文件
 * @param {String} label
 * @param {String} group
 * @param {Array} Dataset
 */

class GetInputOutput extends React.Component {
    // 检测是否为Input，Output Item，分为三种情况
    // 如果为本地数据或HDFS数据，则返回这两种组件，分别等待上传和回传数据
    // 如果为已提供的数据，则将数据上传至Item内，并修改Item右侧标志为已上传
    // 非以上情况则向后端请求数据，得到回传后上传至Item，并进行修改右侧标志
    isInputOutput() {
        const { label, group, Dataset } = this.props;
        if (label === 'hdfs数据') return (<HdfsFile />);
        else if (label === '本地数据') return (<UploadFile />);
        else if (Dataset.length === 0 && group === 'input') {
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
                    fetch(
                        'http://10.105.222.92:3000/showData', init
                    )
                        .then((response) => {
                            if (response.status === 200) {
                                response.json().then((respData) => {
                                    let len = respData.length
                                    var s = respData[0]
                                    for (let i = 1; i < len; i++) {
                                        s = s + "\n" + respData[i]
                                    }
                                    var fieldNameArray = [];
                                    let vectorLength;
                                    const { propsAPI } = this.props;
                                    const { getSelected, update } = propsAPI;
                                    var results = Papa.parse(s, { header: true, dynamicTyping: true });
                                    fieldNameArray.push(results.meta.fields);
                                    vectorLength = results.data.length - 1
                                    var n = new Array();

                                    for (let indexOfCols = 0; indexOfCols < fieldNameArray[0].length; indexOfCols++) {
                                        var colName = fieldNameArray[0][indexOfCols];
                                        var colValue = new Array();
                                        for (let indexOfRows = 0; indexOfRows < results.data.length - 1; indexOfRows++) {
                                            colValue.push(results.data[indexOfRows][colName])
                                        }
                                        n.push({ label: colName, value: colValue })
                                    }
                                    var STAT = new Array();
                                    STAT = Stat(n);
                                    let m = fieldNameArray[0].map((item) => {
                                        return [item, false];
                                    })
                                    var values = {
                                        Dataset: STAT,
                                        labelArray: m,
                                        length: vectorLength
                                    }
                                    const item = getSelected()[0];
                                    values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
                                    values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
                                    update(item, { ...values });
                                    console.log("propsAPI")
                                    console.log(propsAPI.save())
                                })
                            }
                        })
                        .catch(e => console.log('错误:', e))
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
