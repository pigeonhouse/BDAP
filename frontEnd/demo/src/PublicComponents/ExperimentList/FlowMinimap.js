import React from 'react';
import { Button } from 'antd';
import { Minimap, withPropsAPI, Flow } from '@src';
import FlowNodePanel from '../EditorNodePanel'
import { downloadStream } from '../../PublicComponents/HandleStream/downloadStream';

class FlowMinimap extends React.Component {
    handleGetMinimap = () => {
        const { propsAPI } = this.props;
        const flowInfo = downloadStream();
        propsAPI.read(flowInfo);
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleGetMinimap}>Button</Button>
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
