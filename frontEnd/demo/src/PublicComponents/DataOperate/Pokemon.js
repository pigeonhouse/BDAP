import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import { Stat } from './stat';
import { Data }from '../../ExampleData/Pokemon';
class Pokemon extends Component{
    readFile = ()=>{
        const { propsAPI } = this.props;
        const { getSelected, update } = propsAPI;
        var fieldNameArray = [];
        let vectorLength;
        var results = {'data':Data,'meta':{'fields':["Name",,"Type 1","Type 2","Total","HP","Attack","Defense","Sp. Atk","Sp. Def","Speed","Generation","Legendary"]}};
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

export default withPropsAPI(Pokemon);