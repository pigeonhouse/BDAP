import React, {Component} from 'react';
import { Button, Input ,Upload,Icon} from 'antd'
import { withPropsAPI } from '@src';

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
        fetch(
            'http://localhost:5000/handleInput',init
        )
            .then(res => res.json())
            .then(data => {
            console.log(res)
            this.setState({users: data})
            })
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
