import React, {Component} from 'react';
import { Button, Icon } from 'antd'
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
    
        console.log(csv)
        this.setState({
          finalData:csv
        })
    
      }
    readFile = (e)=>{
        var files = e.target.files; // FileList object
        var reader = new FileReader();
        var fieldNameArray = new Array();
        var allData = new Array();
        var vectorLength = new Array();

        reader.readAsText(files[0],'gbk');
        reader.onload = function(e) {
        
        var results = Papa.parse(e.target.result,{header:true,dynamicTyping: true});
        fieldNameArray.push(results.meta.fields);
        vectorLength.push(results.data.length - 1)

        var n = new Array();
        //  console.log(results)
        for(let indexOfCols = 0; indexOfCols < fieldNameArray[0].length; indexOfCols++){
            var colName = fieldNameArray[0][indexOfCols];
            var colValue = new Array();
            for (let indexOfRows = 0; indexOfRows < results.data.length - 1; indexOfRows++){
            colValue.push(results.data[indexOfRows][colName])
            }
            n[colName] = colValue
        }
        allData.push(n)
        console.log(allData)
        
        }
        console.log(allData)
        this.setTest(allData,fieldNameArray,vectorLength)

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
                <Button type="file" onChange={(e)=>this.readFile(e)} multiple >
                    <Icon type="upload" />upload
                </Button>
                <Button type="primary" onClick={()=>this.makeFile()}>makeFile</Button>
            </div>
        );
    }
}

export default Uploadfile;
