import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import { Stat } from './stat';
// import { SeprtbyFeat } from './DataProcess/SeprtbyFeat';
class Uploadfile extends Component{
    
    // makeFile = ()=>{
    //   var allData = this.state.dataSet[0]
  
    //   var fieldNameArray = this.state.labelArray[0]
  
    //   var vectorlength = this.state.length[0]

    //   var newData = new Array();
  
    //   for(let indexOfRows = 0;indexOfRows < vectorlength; indexOfRows++){
    //     var row = new Array();
    //     for(let indexOfCols = 0; indexOfCols < fieldNameArray.length; indexOfCols++ ){
    //         row.push(allData[fieldNameArray[indexOfCols]][indexOfRows])
    //     }
    //     newData.push(row);
    //   }
    //   var csv = Papa.unparse({
    //     "fields": fieldNameArray,
    //     "data": newData
    //   });
  
    //     this.setState({
    //       finalData:csv
    //     })
    //   }
    readFile = (e)=>{
      var files = e.target.files;
      console.log(files)
      var reader = new FileReader();
      const { propsAPI } = this.props;
      const { getSelected, update } = propsAPI;
      reader.readAsText(files[0],'gbk');
      reader.onload = function(e) {
        var fieldNameArray = [];
        let vectorLength;

        var results = Papa.parse(e.target.result,{header:true,dynamicTyping: true});
        fieldNameArray.push(results.meta.fields);
        vectorLength = results.data.length - 1
        var n = new Array();

        for(let indexOfCols = 0; indexOfCols < fieldNameArray[0].length; indexOfCols++){
            var colName = fieldNameArray[0][indexOfCols];
            var colValue = new Array();
            for (let indexOfRows = 0; indexOfRows < results.data.length - 1; indexOfRows++){
            colValue.push(results.data[indexOfRows][colName])
            }
            n.push({label:colName,value:colValue})
        }
        var STAT = new Array();
        STAT = Stat(n);
        let m = fieldNameArray[0].map((item)=>{
          return [item, false];
        })
        var values = {
            Dataset:STAT,
            labelArray:{public:m}, 
            length:vectorLength
        }
        const item = getSelected()[0];
        values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
        values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
        update(item, {...values});
        console.log("propsAPI")
        console.log(propsAPI.save())
        }
    }
    render(){
        return (
          <Button href="javascript:void(0)"
            style={{
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'inline-block',
              '*display': 'inline',
              '*zoom': 1,
            }}
            >
              <input 
                type="file" 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  opacity: 0,
                  filter: 'alpha(opacity=0)',
                  cursor: 'pointer',
                }}
                onChange={(e)=>this.readFile(e)}
              ></input>
              <Icon style={{cursor:'pointer'}} type="upload"/> 上传本地文件
            </Button>
        );
    }
}

export default withPropsAPI(Uploadfile);
