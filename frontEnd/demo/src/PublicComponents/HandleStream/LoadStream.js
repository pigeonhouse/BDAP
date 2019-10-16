import React from 'react';
import { withPropsAPI } from '@src';
import { downloadStream } from './downloadStream';

class LoadStream extends React.Component {

    loadStream = () => {
        const { propsAPI, flowInfo } = this.props;
        const flow = downloadStream(flowInfo);
        if (flow === null) return;
        propsAPI.read(flow);
    }

    componentDidUpdate() {
        this.loadStream();
    }

    componentDidMount() {
        this.loadStream();
    }

    render() {
        return (
            <div style={{ width: 0, height: 0 }}></div>
        );
    }
}

export default withPropsAPI(LoadStream); 