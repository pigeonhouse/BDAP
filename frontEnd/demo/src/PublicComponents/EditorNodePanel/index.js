import React from 'react';
import { FlowItemPanel } from './EditorItemPanel';
import { ClusterFlowDataPanel } from '../../ClusterModeComponents/EditorDataPanel';
import { fetchTool } from '../../FetchTool';

import styles from './index.less';

function itemScrollMatch() {
    var flowItem = document.getElementById('flowItem');
    var menuDiv = document.getElementById('menuDiv');
    if (flowItem === null || menuDiv === null) return;
    var style;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(menuDiv, null);
    } else {
        style = menuDiv.currentStyle;
    }
    flowItem.style.width = style.width;
}

class FlowNodePanel extends React.Component {

    state = {
        isMouseEnter: false,
        nodesModuleInfo: [],
    }

    resize = () => {
        itemScrollMatch();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
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
        return await fetchTool("/module", init);

    }
    async componentWillMount() {
        this.setState({ nodesModuleInfo: await this.fetchmodule() });
        this.screenChange();
    }

    screenChange() {
        window.addEventListener('resize', this.resize);
    }

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
        itemScrollMatch();
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
                id="menuDiv"
            >
                <div id="flowItem">
                    <ClusterFlowDataPanel activeFileList={nodesModuleInfo.files} />
                    <FlowItemPanel moduleNodesList={nodesModuleInfo.nodes} />
                </div>
            </div>
        );
    }
}

export default FlowNodePanel;