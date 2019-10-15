import React from 'react';
import { Minimap, withPropsAPI, Flow } from '@src';
import FlowNodePanel from '../EditorNodePanel'
import { downloadStream } from '../../PublicComponents/HandleStream/downloadStream';

class FlowMinimap extends React.Component {

    render() {
        const { propsAPI, minimapInfo } = this.props;
        if(minimapInfo !== null && propsAPI !== undefined){
            const flowInfo = downloadStream(minimapInfo);
            propsAPI.read(flowInfo);
        }

        return (
            <div>
                <div style={{ width: 0, height: 0 }}>
                    <FlowNodePanel nodesModuleInfo={[]}></FlowNodePanel>
                </div>
                <Flow style={{ height: 0 }} ></Flow>
                <Minimap width={500} height={500} />
            </div>
        );
    }
}

export default withPropsAPI(FlowMinimap);
