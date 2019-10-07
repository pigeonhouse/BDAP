import React from 'react';
import { FlowItemPanel } from './EditorItemPanel';

import { LocalFlowDataPanel } from '../../LocalModeComponents/EditorDataPanel';
import { PythonFlowDataPanel } from '../../PythonModeComponents/EditorDataPanel';
import { ClusterFlowDataPanel } from '../../ClusterModeComponents/EditorDataPanel';

import styles from './index.less';

class FlowNodePanel extends React.Component {

    state = {
        dataTable: [],
        isMouseEnter: false,
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }
    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    render() {
        const props = {
            name: 'file',
            action: 'http://10.105.222.92:3000/handleFile',
        };
        return (
            <div
                onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                style={{ backgroundColor: '#fff' }}
            >
                <ClusterFlowDataPanel dataTable={this.state.dataTable} />
                <FlowItemPanel />
            </div>
        );
    }
}

export default FlowNodePanel;