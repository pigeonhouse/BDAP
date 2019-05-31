import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import { Stat } from './stat';
import { data }from '../../LocalModeComponents/ExampleData/TitanicTest';
class LocalTestData extends Component{
    readFile = ()=>{
        const { propsAPI } = this.props;
        const { getSelected, update } = propsAPI;
        var fieldNameArray = [];
        let vectorLength;
        var results = {'data':data,'meta':{'fields':["PassengerId","Pclass","Name","Sex","Age","SibSp","Parch","Ticket","Fare","Cabin","Embarked"]}};
        fieldNameArray.push(results.meta.fields);
        vectorLength = results.data.length - 1;
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
    }
    render(){
        return(
            <div>{this.readFile()}</div>
        )
    }
}

export default withPropsAPI(LocalTestData);
