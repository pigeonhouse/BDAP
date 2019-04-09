import React, {Component} from 'react';
import { Button, Input ,Upload,Icon} from 'antd'
import { withPropsAPI } from '@src';
import { Stat } from './stat'

class HdfsFile extends Component{
    constructor(){    
        super();   
        this.state = {inpValu:""}
        this.handelChange  = this.handelChange.bind(this);  
   }
 
    handelChange(e){
        var t = e.target

        this.setState({
            inpValu:t.value
        })

    }

    submit = ()=>{       
        const init={
        method: 'POST', 
        body:JSON.stringify(this.state.inpValu),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        }
        const { propsAPI } = this.props;
        const { getSelected, update, executeCommand } = propsAPI;

        fetch(
            'http://localhost:5000/handleInput',init
        )
            .then(response => {
                if(response.status===200){
                    response.json().then((respData)=>{
                        let label = respData[0].colName.split(', ');
                        const data = respData.slice(1);
                        var Dataset = new Array();
                        for(let i in label){
                            var oneData = {};
                            oneData['label'] = label[i];
                            oneData['value'] = new Array();
                            for(let j in data){
                                if(data[j][label[i]]){
                                    oneData.value.push(data[j][label[i]])
                                }
                                else oneData.value.push(null)
                            }
                            Dataset.push(oneData);
                        }
                        var length = data.length;
                        var labelArray = new Array();
                        for(let i in label){
                            labelArray.push([label[i], false]);
                        }
                        const item = getSelected()[0];
                        var values = {
                            Dataset:Stat(Dataset),
                            length,
                            labelArray:{public:labelArray},

                        }
                        console.log('values')
                        console.log(values)
                        // values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
                        // values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
                        update(item, {...values});
                    })
                  }
            })

            // let m = data[1][0].map((item)=>{
            //     return [item, false];
            //   })
            //   const values = {
            //       Dataset:data[0],
            //       labelArray:{public:m}, 
            //       length:data[2]
            //   }
            //   const item = getSelected()[0];
            //   update(item, {...values});

            // this.setState({
            //     alldata: data,
            // })
            .catch(e => console.log('错误:', e)) 

    }

    render(){
        return(
            <div>
                <span>location:</span>
                <Input type="text" onChange={this.handelChange} value={this.state.inpValu} style={{margin:5}}/>
                
                <Button onClick={()=>this.submit()}>confirm</Button>

            </div>
        )
    }
}
export default withPropsAPI(HdfsFile);
