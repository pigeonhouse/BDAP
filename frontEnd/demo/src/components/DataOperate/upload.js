import React, {Component} from 'react';
import { Button, Input ,Upload,Icon} from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import store from '../../store';
import {UpL} from '../../store/actionCreate';
import styles from './inputStyle.less'

const props = {
  name: 'file',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class Uploadfile extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    makeFile = ()=>{
        var allData = this.state.dataSet[0]
    
        var fieldNameArray = this.state.labelArray[0]
    
        var vectorlength = this.state.length[0]
        
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
    
        this.setState({
          finalData:csv
        })
    
      }
    readFile = (e)=>{
        var files = e.target.files;
        //var files = e; // FileList object
        console.log(files)
        var reader = new FileReader();
        const { propsAPI } = this.props;
        const { getSelected, update, executeCommand } = propsAPI;
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
              n.push([{label:colName,value:colValue}])
          }
          let m = fieldNameArray[0].map((item)=>{
            return [item, false];
          })
          const values = {
              Dataset:n,
              labelArray:m, 
              length:vectorLength
          }
          const item = getSelected()[0];
          update(item, {...values});
        }


    }
    setTest = (allData,fieldNameArray,vectorLength) =>{
        this.setState({
          dataSet:allData,
          labelArray:fieldNameArray,
          length:vectorLength
        })
      }

    render(){
        return (
            <div>
                
                <input type="file" style={{position:"absolute" ,opacity:0}} onChange={(e)=>this.readFile(e)}></input>
                {/* <Button>本地文件</Button> */}
               
                  <Icon type="upload"/> 上传本地文件
                
                {/* <button className="btn btn-primary" style={{width:"150px",height:"30px"}}></button> */}
                
                {/* <label for="file">Choose a file</label> */}
                {/* <Button type="primary" onClick={()=>this.makeFile()}>makeFile</Button> */}
                 {/* <Upload onChange={(e)=>this.readFile(e)} >
                <Button>
                  <Icon type="upload" /> 上传本地数据
                </Button>
                </Upload> */}
            </div>
        );
    }
}

export default withPropsAPI(Uploadfile);
