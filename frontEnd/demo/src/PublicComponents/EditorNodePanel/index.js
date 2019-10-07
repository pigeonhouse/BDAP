import React from 'react';
import { FlowItemPanel } from './EditorItemPanel';
import { ClusterFlowDataPanel } from '../../ClusterModeComponents/EditorDataPanel';

import styles from './index.less';

class FlowNodePanel extends React.Component {

    state = {
        isMouseEnter: false,
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        console.log(this.props.nodesModuleInfo.nodes)
        return (
            <div
                onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                style={{ backgroundColor: '#fff' }}
            >
                <ClusterFlowDataPanel  activeFileList={this.props.nodesModuleInfo.files} />
                <FlowItemPanel moduleNodesList={this.props.nodesModuleInfo.nodes} />
            </div>
        );
    }
}

export default FlowNodePanel;