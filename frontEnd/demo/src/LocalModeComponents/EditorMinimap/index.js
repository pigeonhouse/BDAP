import React from 'react';
import { Card } from 'antd';
import { Minimap } from '@src';

class EditorMinimap extends React.Component {
  render() {
    return (
      // <Card type="inner" title="缩略图" bordered={false}>
      <Card type="inner" title="缩略图" >
        <Minimap height={200} />
      </Card>
    );
  }
}

export default EditorMinimap;
