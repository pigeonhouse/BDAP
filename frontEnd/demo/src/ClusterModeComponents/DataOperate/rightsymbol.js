import React, {Component} from 'react'
import { Button } from 'antd'
import store from '../../store';

class Rightsymbol extends Component{
    constructor(props){
        super(props);
    }
    rightsymbols = ()=>{
        if(status === ''){
            return <Button>rightsymboltest</Button>;
        }
        else if(status === ''){

        }
        else if(status === ''){

        }
    }
    render(){
        return (
            <div>
                {this.rightsymbols()}
            </div>
        );
    }
}
export default Rightsymbol;
