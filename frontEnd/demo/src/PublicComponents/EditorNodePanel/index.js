import React from 'react';
import { FlowItemPanel } from './EditorItemPanel';
import { ClusterFlowDataPanel } from '../../ClusterModeComponents/EditorDataPanel';
import { fetchTool } from '../../FetchTool';

import styles from './index.less';

class FlowNodePanel extends React.Component {

    state = {
        isMouseEnter: false,
        nodesModuleInfo: [],
    }

    async fetchmodule() {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const res = await fetchTool("/module", init)
        if (res.code === 200) {
            return res.data
        }

    }

    async componentWillMount() {
        this.setState({ nodesModuleInfo: await this.fetchmodule() });
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }

    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        const { nodesModuleInfo } = this.state;
        return (
            <div
                onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                style={{ backgroundColor: '#fff' }}
            >
                <ClusterFlowDataPanel activeFileList={nodesModuleInfo.files} />
                <FlowItemPanel moduleNodesList={nodesModuleInfo.nodes} />
            </div>
        );
    }
}

export default FlowNodePanel;