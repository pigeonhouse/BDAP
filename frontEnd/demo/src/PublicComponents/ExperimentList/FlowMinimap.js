import React from 'react';
import { Minimap, withPropsAPI, Flow } from '@src';
import FlowNodePanel from '../EditorNodePanel'
import { downloadStream } from '../../PublicComponents/HandleStream/downloadStream';

class FlowMinimap extends React.Component {

    render() {
        const { propsAPI, minimapInfo } = this.props;
        if (minimapInfo !== null && propsAPI !== undefined) {
            const { nodes, edges } = minimapInfo;
            const flowInfo = { edges, nodes: downloadStream(nodes) };

            if (flowInfo === null) return;
            propsAPI.read(flowInfo);
        }

        return (
            <div style={{ paddingTop: 50 }} >
                <div style={{ width: 0, height: 0 }}>
                    <FlowNodePanel nodesModuleInfo={[]}></FlowNodePanel>
                </div>
                <Flow style={{ height: 0 }} ></Flow>
                <div style={{ width: "500px", height: "500px" }} >
                    <Minimap width={500} height={500} />
                </div>
            </div>
        );
    }
}

export default withPropsAPI(FlowMinimap);
