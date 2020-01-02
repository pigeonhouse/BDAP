import React, { Component } from 'react';
import { Button, Form, Modal, Input } from 'antd';
import { withPropsAPI } from '@src';
import  JsParser from './jsParser';
import { findSourceColumnsInfo } from '../NodeDetail/SelectWord/TransferSelect/FindSourceColumnsInfo';
class GenerateColumn extends Component {
     state={
        ShowEditor:false,//控制弹窗显隐的函数
        expression:"",//已经过计算的表达式
        expvalid:true//判断生成的表达式是否合法的变量
     };

    handleShowEditor=()=>{
        this.setState({ShowEditor:!this.state.ShowEditor})
    }
    
    render() {
        const {propsAPI}=this.props;
       
        const { getSelected } = propsAPI;
        const item = getSelected()[0];
        const sourceColumnsInfo = findSourceColumnsInfo(item, "0", propsAPI);
		return (
			<Form>
				<Form.Item label="已确定的表达式:">
					<Input disable={true} value={0} ></Input>
                    <Button onClick={this.handleShowEditor}>点此展开表达式编辑器</Button>
                    <Modal title="表达式编辑器" visible={this.state.ShowEditor} width={1200} onOk={this.handleShowEditor} onCancel={this.handleShowEditor}>
                        <JsParser item={item} dataSource={sourceColumnsInfo}/>
                    </Modal>
				</Form.Item>
                
			</Form>
		)
	}


}
export default Form.create()(withPropsAPI(GenerateColumn));