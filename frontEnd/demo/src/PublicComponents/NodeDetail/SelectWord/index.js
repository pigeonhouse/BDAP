import React, { Component, Fragment } from 'react';
import { withPropsAPI } from '@src';

import TransferSelect from './TransferSelect.js';

/**
 * 选择字段组件
 * 对labelArray进行选择，即选择字段
 */

class SelectWord extends Component {

    changeLabelArray = (labelArray, index, columnsInfo) => {
        const { propsAPI, item } = this.props;
        const { executeCommand, update } = propsAPI;
        let { attributes } = item.model;

        attributes = JSON.parse(JSON.stringify(attributes));
        attributes[index].value = labelArray;

        executeCommand(() => {
            update(item, {
                attributes, columnsInfo
            });
        });
    }

    render() {
        const { attributes, item } = this.props;
        return (
            <Fragment>
                {attributes.map((attribute, index) => {
                    if (attribute.styleType === "ChooseCol") {
                        return <TransferSelect
                            item={item}
                            index={index}
                            attribute={attribute}
                            changeLabelArray={this.changeLabelArray}
                        />
                    }
                })}
            </Fragment>
        );
    }
}

export default withPropsAPI(SelectWord);
