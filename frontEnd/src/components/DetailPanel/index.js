import React from 'react';
import { pick } from '@utils';
import { STATUS_CANVAS_SELECTED } from '@common/constants';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';
import Panel from './Panel';

class DetailPanel extends React.Component {
  state = {
    status: '',
  }

  constructor(props) {
    super(props);

    this.bindEvent();
  }

  bindEvent() {
    const { onAfterAddPage } = this.props;

    onAfterAddPage(({ page }) => {
      this.setState({
        status: STATUS_CANVAS_SELECTED,
      });

      page.on('statuschange', ({ status }) => {
        this.setState({ status });
      });
      page.on('hoveranchor:beforeaddedge', ev => {
        if (ev.anchor.type === 'input') {
          ev.cancel = true;
        }
      });
      page.on('dragedge:beforeshowanchor', ev => {
        // 只允许目标锚点是输入，源锚点是输出，才能连接
        if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
          ev.cancel = true;
        }
        // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
        if (ev.dragEndPointType === 'target' && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
          ev.cancel = true;
        }
        // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
        if (ev.dragEndPointType === 'source' && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
          ev.cancel = true;
        }
      });
    });
  }

  render() {
    const { children } = this.props;
    const { status } = this.state;

    if (!status) {
      return null;
    }

    return (
      <div {...pick(this.props, ['style', 'className'])}>
        {
          React.Children.toArray(children).map(child => React.cloneElement(child, {
            status,
          }))
        }
      </div>
    );
  }
}

export const NodePanel = Panel.create('node');
export const EdgePanel = Panel.create('edge');
export const GroupPanel = Panel.create('group');
export const MultiPanel = Panel.create('multi');
export const CanvasPanel = Panel.create('canvas');

export default withGGEditorContext(DetailPanel);
