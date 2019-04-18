import React from 'react';
import { withPropsAPI } from '@src'
class FlowConnect extends React.Component {
  // componentWillUpdate(){
  //   // console.log('----------------')
  //   // const { propsAPI } = this.props;
  //   // const { save } = propsAPI;
  //   // console.log(propsAPI.save())
  //   // if(propsAPI['edges'] === undefined)
  //   //   return 0;
  //   // console.log(propsAPI['edges'])
  //   // const inf = propsAPI.save();

  //   // var Sourc;
  //   // var p = 0;
  //   // var str = new Array(inf.nodes.length).fill(0);
  //   // if(inf.hasOwnProperty('edges')){
  //   //     let Deg = new Array(inf.nodes.length).fill(0);
  //   //     let Varif = new Array(inf.nodes.length).fill(0);
  //   //     for (let indexE of inf.edges.keys()){
  //   //       Sourc = inf.edges[indexE].target;
  //   //       for (let indexN of inf.nodes.keys()){
  //   //         if (Sourc === inf.nodes[indexN].id){
  //   //           Deg[indexN]++;
  //   //           Varif[indexN] = 1;
  //   //         }
  //   //       }
  //   //       Sourc = inf.edges[indexE].source;
  //   //       for (let indexN of inf.nodes.keys())
  //   //         if (Sourc === inf.nodes[indexN].id)  Varif[indexN] = 1;
  //   //     }
  //   //     for(let i = 0; i < Deg.length; i++){
  //   //         if(Deg[i] === 0){
  //   //           const name = inf.nodes[indexN].group;
  //   //           if(name == "input"){
  //   //             //开头是数据输入；
  //   //           }
  //   //           else{
  //   //             const { find, update, executeCommand } = propsAPI;
  //   //             const nextitem = find(inf.nodes[indexN].id);
  //   //             var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
  //   //             value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
  //   //             executeCommand(() => {
  //   //               update(nextitem, {keyConfig:{...value}});
  //   //             });
  //   //             console.log("ppppppppppppppppppppppppppppppppp")
  //   //             return 4;  //开头连错，不是数据模块
  //   //           }
  //   //         }
  //   //     }
  //   //     for(let count = 0; count < inf.nodes.length; count++){
  //   //       for(let i = 0; i < Deg.length; i++){
  //   //         if(Deg[i] === 0){
  //   //           str[i] = 1;
  //   //           p++;
  //   //           for(let j = 0; j < inf.edges.length; j++)
  //   //             if(inf.nodes[i].id == inf.edges[j].source)  Deg[j]--;
  //   //         }
  //   //       }
  //   //     }
  //   //     console.log("xxxxxxxxxxx");
  //   //     console.log(str);
  //   //     console.log(Varif);
  //   //     //in str >0

  //   //     if(p <= inf.nodes.length){ 
  //   //       for(let k = 0; k < str.length; k++){
  //   //         if(str[k] != 1){
  //   //           const { find, update, executeCommand } = propsAPI;
  //   //           const nextitem = find(inf.nodes[i].id);
  //   //           var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
  //   //           value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
  //   //           executeCommand(() => {
  //   //             update(nextitem, {keyConfig:{...value}});
  //   //           });
  //   //         }
  //   //       }
  //   //       return 2; //loop
  //   //     }
  //   //     for(let i = 0; i < Varif.length; i++){
  //   //       if(Varif[i] === 0){
  //   //         const { find, update, executeCommand } = propsAPI;
  //   //         const nextitem = find(inf.nodes[i].id);
  //   //         var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
  //   //         value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
  //   //         executeCommand(() => {
  //   //           update(nextitem, {keyConfig:{...value}});
  //   //         });
  //   //         return 3; // alone      in Varif =0
  //   //       }
  //   //     }
  //   //   }
  //   //   console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqq")
  //   //   return 0; 
  // }
  // handleError=()=>{
  //   const { propsAPI } = this.props;
  //   const { save, find } = propsAPI;
  //   }
  render() {
    return (
        <div>
          {/* {this.handleError()} */}
        </div>
    );
  }
}

export default withPropsAPI(FlowConnect);