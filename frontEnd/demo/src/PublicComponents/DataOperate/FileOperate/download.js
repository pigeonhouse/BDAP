import React, { Component } from 'react';
import { Icon, message } from 'antd'
import { withPropsAPI } from '@src'
import Papa from 'papaparse'
import { Command } from '@src';
import styles from '../../EditorContextMenu/index.less';

class Download extends Component{
    makeFile = ()=>{
        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
        const item = getSelected()[0];
        const model = item.getModel();
        const { group } = model;
        var allData = model.Dataset;
        var labelArray = model.labelArray;

        if(allData.length === 0){
            message.warning('no file!');
            return ;
        }
        else {
            if(group === 'ml'){
                allData = allData[1];
                labelArray = labelArray[1];
            }

            var fieldNameArray = new Array();
            var newData = new Array();
            
            for(let i in labelArray){
                fieldNameArray.push(labelArray[i][0]);
            }
            for(let i in allData[0].value){
                var row = new Array();
                for(let j in allData){
                    row.push(allData[j].value[i]);
                }
                newData.push(row);
            }
            var csv = Papa.unparse({
                "fields": fieldNameArray,
                "data": newData
            });
            this.downFile(csv);
        }
    }

    downFile = (list)=> {
        var elementA = document.createElement('a');
        elementA.download = "Dataset.csv";
        elementA.style.display = 'none';
        var blob = new Blob([list], {
            type: "text/csv;charset="+ 'utf-8' + ";"
        });
        elementA.href = URL.createObjectURL(blob);
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
    }

    render(){
        return (
            <Command name="showpicture">
                <div className={styles.item} onClick={this.makeFile}>
                    <Icon type="download" />
                    <span>下载</span>
                </div>
            </Command>
        );
    }
}

export default withPropsAPI(Download);
