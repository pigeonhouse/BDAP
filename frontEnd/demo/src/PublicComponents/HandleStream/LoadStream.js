import React from 'react';
import { withPropsAPI } from '@src';
import { downloadStream } from './downloadStream';

class LoadStream extends React.Component {
    loadStream = () => {
        const { propsAPI } = this.props;
        const flowInfo = downloadStream();
        propsAPI.read(flowInfo);
    }

    componentDidMount(){
        this.loadStream();
    }

    render() {
        return (
            <div style={{ width: 0, height: 0 }}></div>
        );
    }
}

export default withPropsAPI(LoadStream); 