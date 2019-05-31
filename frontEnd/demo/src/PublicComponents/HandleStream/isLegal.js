/**
 * 检测组件连接及内部属性的合法性,返回0为合法，其他为不合法
 */
export function isLegal (){
    const { propsAPI } = this.props;
    const inf = propsAPI.save();
    console.log("--------LegalTest---------")
    console.log(inf);
    if(!inf.hasOwnProperty("nodes")){
      message.error("先从左边拖来一些部件框吧")
      return 1;
    }
    if(!inf.hasOwnProperty("edges")){
      message.error("一个边都还没有连呢！")
      return 1;
    }
    
    var Sourc;
    var count_avali = 0;
    let Deg = new Array(inf.nodes.length).fill(0);
    let Varif = new Array(inf.nodes.length).fill(0);
    for(let indexE of inf.edges.keys()){
      Sourc = inf.edges[indexE].target;
      for (let indexN of inf.nodes.keys()){
        if (Sourc === inf.nodes[indexN].id){
          Deg[indexN]++;
          Varif[indexN] = 1;
          break;
        }
      }
    }
    for(let i = 0; i < Deg.length; i++){
        if(Deg[i] === 0){
          const name = inf.nodes[i].group;
          if(name == "input"){
            if(inf.nodes[i].label == "本地数据" && inf.nodes[i].Dataset.length == 0){
              message.error("还没有上传文件给本地数据模块，请点击本地数据后，在右边参数栏点击'上传本地文件'!(或者您的文件是空的)");
              return 5; //本地数据没有上传
            }
          }
          else{
            const { find, update, executeCommand } = propsAPI;
            const nextitem = find(inf.nodes[i].id);
            var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
            value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
            executeCommand(() => {
              update(nextitem, {keyConfig:{...value}});
            });
            message.error("连线开头必须是数据模块哦!")
            return 4;  //开头连错，不是数据模块
          }
        }
    }

    for(let c = 0; c < inf.nodes.length; c++){
      for(let i = 0; i < Deg.length; i++){
        if(Deg[i] === 0){
          Deg[i] = -1;
          count_avali++;
          for(let j = 0; j < inf.edges.length; j++){
            if(inf.nodes[i].id == inf.edges[j].source){
              for(let k = 0; k < inf.nodes.length; k++){
                if(inf.nodes[k].id == inf.edges[j].target){
                  Deg[k]--;
                }
              }
            }
          }
          break;
        }
      }
    }
    if(count_avali < inf.nodes.length){ 
      for(let k = 0; k < Deg.length; k++){
        if(Deg[k] != -1){
          const { find, update, executeCommand } = propsAPI;
          const nextitem = find(inf.nodes[k].id);
          var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
          executeCommand(() => {
            update(nextitem, {keyConfig:{...value}});
          });
        }
      }
      message.error("您有未连入的模块哦！给您用叉号标示出来了")
      return 2; //有未连入的
    }
    return 0; 
  }