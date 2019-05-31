import React from 'react';
import GGEditor,{ Flow, RegisterNode } from '@src';

/**
 * FlowItemPanel中组件的风格
 * one-one  上节点 1个   下节点 1个
 * two-one  上节点 2个   下节点 1个
 * one-two  上节点 1个   下节点 2个
 * zero-one  上节点 0个   下节点 1个
 * one-zero  上节点 1个   下节点 0个
 */

class ItemDecoration extends React.Component{
    render(){
        return (
            <GGEditor style={{height:0, width:0}}>
              <Flow />
              <RegisterNode 
                name = {'model-all'}
                config =  {{
                  draw(item) {
                    const group = item.getGraphicGroup();
                    const model = item.getModel();
                    const width = 184;
                    const height = 40;
                    const x = -width / 2;
                    const y = -height / 2;
                    const borderRadius = 4;
                    const keyShape = group.addShape('rect', {
                      attrs: {
                        x,
                        y,
                        width,
                        height,
                        radius: borderRadius,
                        fill: 'white',
                        stroke: '#CED4D9'
                      }
                    });
                    // 左侧色条
                    group.addShape('path', {
                      attrs: {
                        path: [
                          [ 'M', x, y + borderRadius ],
                          [ 'L', x, y + height - borderRadius ],
                          [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
                          [ 'L', x + borderRadius, y ],
                          [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
                        ],
                        fill: model.keyConfig.color_type
                      }
                    });
                    // 类型 logo
                    group.addShape('image', {
                      attrs: {
                        img: this.type_icon_url,
                        x: x + 16,
                        y: y + 12,
                        width: 20,
                        height: 16
                      }
                    });
                    // 名称文本
                    const label = model.label;
                    group.addShape('text', {
                      attrs: {
                        text: label,
                        x: x + 52,
                        y: y + 15,
                        textAlign: 'start',
                        textBaseline: 'top',
                        fill: 'rgba(0,0,0,0.65)'
                      }
                    });
                    // 状态 logo
                    const images = group.addShape('image', {
                      attrs: {
                        x: x + 158,
                        y: y + 12,
                        width: 16,
                        height: 16,
                        img: model.keyConfig.state_icon_url
                      }
                    });
                    images.animate({
                      onFrame(ratio) {
                        const matrix = Util.mat3.create();
                        const toMatrix = Util.transform(matrix, [
                          ['r', ratio * Math.PI * 2]
                        ]) ;
                        return {
                          matrix: toMatrix
                        };
                      },
                      repeat: true
                    }, 3000, 'easeCubic');
                    return keyShape;
                  },
                  anchor: [
                    [ 0.5, 0, {
                      type: 'input'
                    }],
                    [ 0.5, 1, {
                      type: 'output'
                    }],
                  ],
                  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
                }}
                extend = {'flow-rect'}
              />
              <RegisterNode 
                name = {'two-one'}
                config =  {{
                  anchor: [
                    [ 0.33, 0, {
                      type: 'input'
                    }],
                    [ 0.66, 0, {
                      type: 'input'
                    }],
                    [ 0.5, 1, {
                      type: 'output'
                    }]
                  ]
                }}
                extend = {'model-all'}
              />
              <RegisterNode 
                name = {'one-one'}
                config =  {{
                  anchor: [
                    [ 0.5, 0, {
                      type: 'input'
                    }],
                    [ 0.5, 1, {
                      type: 'output'
                    }]
                  ]
                }}
                extend = {'model-all'}
              />
              <RegisterNode 
                name = {'one-two'}
                config =  {{
                  anchor: [
                    [ 0.5, 0, {
                      type: 'input'
                    }],
                    [ 0.33, 1, {
                      type: 'output'
                    }],
                    [ 0.66, 1, {
                      type: 'output'
                    }]
                  ]
                }}
                extend = {'model-all'}
              />
              <RegisterNode 
                name = {'zero-one'}
                config =  {{
                  anchor: [
                    [ 0.5, 1, {
                      type: 'output'
                    }]
                  ]
                }}
                extend = {'model-all'}
              />
              <RegisterNode 
                name = {'one-zero'}
                config =  {{
                  anchor: [
                    [ 0.5, 0, {
                      type: 'input'
                    }]
                  ]
                }}
                extend = {'model-all'}
              />
            </GGEditor>
        );
    }
}

export default ItemDecoration;
