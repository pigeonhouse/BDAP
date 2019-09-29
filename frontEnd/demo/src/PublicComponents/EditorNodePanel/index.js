import React, { Fragment } from 'react';
import { } from 'antd';

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

    selectFlowDataPanel = () => {
        switch (this.props.type) {
            case 'local':
                return <LocalFlowDataPanel dataTable={this.state.dataTable} />;
            case 'python':
                return <PythonFlowDataPanel dataTable={this.state.dataTable} />;
            case 'cluster':
                return <ClusterFlowDataPanel dataTable={this.state.dataTable} />;
        }
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
                {this.selectFlowDataPanel()}
                <FlowItemPanel type={this.props.type} />
            </div>
        );
    }
}

export default FlowNodePanel;