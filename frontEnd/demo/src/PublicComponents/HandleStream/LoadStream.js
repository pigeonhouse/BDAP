import React from 'react';
import { withPropsAPI } from '@src';
import { downloadStream } from './downloadStream';
import { fetchTool } from '../../FetchTool';

class LoadStream extends React.Component {

    fetchModalStream = async (experiment) => {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            credentials: 'include'
        }
        const response = await fetchTool(`/experiment-service/experiments/${experiment.experimentId}`, init)

        return await response.json();
    }

    loadStream = async () => {
        const { propsAPI, experiment } = this.props;
        if (experiment === null) return;

        const flowInfo = await this.fetchModalStream(experiment);
        const flow = downloadStream(flowInfo);
        if (flow === null) return;
        propsAPI.read(flow);
    }

    async componentDidMount() {
        await this.loadStream();
    }

    render() {
        return (
            <div style={{ width: 0, height: 0 }}></div>
        );
    }
}

export default withPropsAPI(LoadStream); 