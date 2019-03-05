import React, {Component} from 'react'
import { withPropsAPI } from '@src';
import { Input, Divider, InputNumber, Form } from 'antd'
const { Item } = Form;

const inlineFormItemLayout = {
    labelCol: {
      sm: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 18 },
    },
  };

class FeatureGroup extends Component{
    constructor(props){
        super(props);
        this.state={
            info: []
        }
    }
    handleNumber=()=>{

    }
    handleSubmit = (e) => {
        e.preventDefault();

        const { form, propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;

        form.validateFieldsAndScroll((err, values) => {
        if (err) {
            return;
        }

        const item = getSelected()[0];
        if (!item) {
            return;
        }
        executeCommand(() => {
            update(item, {
            ...values,
        
            });
        });
        });
        console.log(propsAPI.save())
    }
    render(){
        var arr=[];
        let labelArray = this.props.labelArray;
        for(let i in labelArray){
            if(labelArray[i][1]){
                arr.push(labelArray[i][0]);
            }
        }
        return (
            <div style={{maxHeight:'500px'}}>
                <Form onSubmit={this.handleSubmit}>
                    {arr.map((item)=>{
                        return  <div>
                                    <Item><Divider>{item}</Divider></Item>
                                    <Item label='remain' {...inlineFormItemLayout}>
                                        {
                                        getFieldDecorator(`attr.${item}`)
                                        (<Input onBlur={this.handleSubmit} />)
                                        }
                                    </Item>;
                                </div>
                    })}
                </Form>
            </div>
        );
    }
}

export default withPropsAPI(FeatureGroup)