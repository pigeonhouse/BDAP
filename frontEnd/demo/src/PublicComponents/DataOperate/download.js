import React, { Component } from 'react';
import { Icon } from 'antd'
import { withPropsAPI } from '@src'
import Papa from 'papaparse'
import {
    Command
  } from '@src';
import styles from '../EditorContextMenu/index.less';
class Download extends Component{
    constructor(props){
        super(props);
    }
    makeFile = ()=>{
        console.log('---------')
        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
        const item = getSelected()[0];
        const model = item.getModel();
        var allData = model.dataset;
        var fieldNameArray = model.labelArray;
        var vectorlength = model.length;

        var newData = new Array();

        for(let indexOfRows = 0;indexOfRows < vectorlength; indexOfRows++){
            var row = new Array();
            for(let indexOfCols = 0; indexOfCols < fieldNameArray.length; indexOfCols++ ){
                row.push(allData[fieldNameArray[indexOfCols]][indexOfRows])
            }
            newData.push(row);
        }
        var csv = Papa.unparse({
            "fields": fieldNameArray,
            "data": newData
        });
        console.log(csv);
        this.downFile(csv);
    }
    downFile = (list)=> {
        console.log('------')
        console.log(list)
        // var elementA = document.createElement('a');
        // elementA.download = "downLoad.csv";
        // elementA.style.display = 'none';
        // var blob = new Blob([list], {
        //     type: "text/csv;charset="+ 'utf-8' + ";"
        // });
        // elementA.href = URL.createObjectURL(blob);
        // document.body.appendChild(elementA);
        // elementA.click();
        // document.body.removeChild(elementA);
    }

    render(){
        return (
            <Command name="showpicture">
                <div className={styles.item} onClick={this.makeFile}>
                    <Icon type="solution" />
                    <span>下载</span>
                </div>
            </Command>
        );
    }
}

export default withPropsAPI(Download);
