import React, {Component} from 'react';
import { Button } from 'antd'
class Download extends Component{
    constructor(props){
        super(props);
    }
    downFile = ()=> {
        const { list, filename } = this.props;
        var elementA = document.createElement('a');
        elementA.download = filename + ".csv";
        elementA.style.display = 'none';
        var blob = new Blob([list], {
                type: "text/csv;charset="+ 'utf-8' + ";"
        });
        elementA.href = URL.createObjectURL(blob);
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
    }

    render(){
        return (
            <Button 
                onClick={this.downFile}
                style={{width:'206px',marginBottom:'10px'}}
            >download</Button>
        );
    }
}

export default Download;
