import React, { Component } from 'react';
import { withPropsAPI } from '@src';
import { Stat } from '../DataToolFunctions/stat';

import { TitanicTest } from '../ExampleData/TitanicTest';
import { TitanicTrain } from '../ExampleData/TitanicTrain';
import { Pokemon } from '../ExampleData/Pokemon';
import { SimpleTest } from '../ExampleData/SimpleTest';
import { SimpleTrain } from '../ExampleData/SimpleTrain';

class ExampleDataUpload extends Component {
    readFile = () => {
        const { propsAPI } = this.props;
        const { getSelected, update } = propsAPI;
        var fieldNameArray = [];
        let vectorLength;
        var results;

        switch (this.props.fileName) {
            case 'Titanic测试': results = { 'data': TitanicTest, 'meta': { 'fields': ["PassengerId", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"] } };
            case 'Titanic训练': results = { 'data': TitanicTrain, 'meta': { 'fields': ["PassengerId", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"] } };
            case 'Pokemon': results = { 'data': Pokemon, 'meta': { 'fields': ["Name", "Type 1", "Type 2", "Total", "HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed", "Generation", "Legendary"] } };
            case 'SimpleTest': results = { 'data': SimpleTest, 'meta': { 'fields': ["id", "age", "gender"] } };
            case 'SimpleTrain': results = { 'data': SimpleTrain, 'meta': { 'fields': ["id", "age", "gender", "score"] } }
        }

        fieldNameArray.push(results.meta.fields);
        vectorLength = results.data.length - 1;
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
            labelArray: { public: m },
            length: vectorLength
        }
        const item = getSelected()[0];
        values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
        values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
        update(item, { ...values });
    }
    render() {
        return (
            <div>{this.readFile()}</div>
        )
    }
}

export default withPropsAPI(ExampleDataUpload);