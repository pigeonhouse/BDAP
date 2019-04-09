import React from 'react';
import { withPropsAPI } from '@src'
class FlowConnect extends React.Component {

  handleError = () =>{
    const { propsAPI } = this.props;
    const { save, find } = propsAPI;
    if(propsAPI['edges'] === undefined)
    return 0;
    const inf = propsAPI.save();

    var Sourc;
    var p = 0;
    var str = new Array(inf.nodes.length).fill(0);
    if(inf.hasOwnProperty('edges')){
      let Deg = new Array(inf.nodes.length).fill(0);
      let Varif = new Array(inf.nodes.length).fill(0);
      for (let indexE of inf.edges.keys()){
        Sourc = inf.edges[indexE].target;
        for (let indexN of inf.nodes.keys()){
          if (Sourc === inf.nodes[indexN].id){
            Deg[indexN]++;
            Varif[indexN] = 1;
          }
        }
        Sourc = inf.edges[indexE].source;
        for (let indexN of inf.nodes.keys())
          if (Sourc === inf.nodes[indexN].id)  Varif[indexN] = 1;
      }
        for(let i = 0; i < Deg.length; i++){
          if(Deg[i] === 0){
            const name = inf.nodes[indexN].lable;
            if(name == "本地数据" || name == "Titanic训练" || name == "Titanic测试"){
              //可以哒；
            }
            else return 4;  //开头连错，不是数据模块
          }
      }
      for(let count = 0; count < inf.nodes.length; count++){
        for(let i = 0; i < Deg.length; i++){
          if(Deg[i] === 0){
            str[i] = 1;
            p++;
            for(let j = 0; j < inf.edges.length; j++)
              if(inf.nodes[i].id == inf.edges[j].source)  Deg[j]--;
          }
        }
      }
      console.log("xxxxxxxxxxx");
      console.log(str);
      console.log(Varif);
      //in str >0
      if(p <= inf.nodes.length) return 2; //loop
      for(let i = 0; i < Varif.length; i++){
        if(Varif[i] === 0)  return 3; // alone      in Varif =0
        }
      }
      return 0; 
  }
  exam(){
    this.handleError()
  }
  render() {
    return (
        <div>
            {this.exam()}
        </div>
    );
  }
}

export default withPropsAPI(FlowConnect);