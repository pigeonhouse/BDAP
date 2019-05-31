import React, { Component } from 'react'
import { Button } from 'antd'
import { withPropsAPI } from '@src';
import { Stat } from '../../PublicComponents/DataOperate/stat'
var cur = 0

class SparkRun extends Component{
  state = { 
    visible: false,
  }

  onClickButton = ()=>{
    const { propsAPI } = this.props;
    console.log(propsAPI.save())
    const inf = propsAPI.save();

    var Sourc = 0;
    var tag = 'Input';
    var stream = new Array();
    var attribute = new Array();
    var labelarray = new Array();


    if(inf.hasOwnProperty('edges')){
      let Deg = new Array(inf.nodes.length).fill(0);
      var sourceId = new Array(inf.nodes.length).fill(0);
      for(let i in sourceId) {
        sourceId[i] = new Array();
      }
      for (let indexE of inf.edges.keys()) {
        Sourc = inf.edges[indexE].target;
        let targetanchor = inf.edges[indexE].targetAnchor;
        let source = inf.edges[indexE].source;
        let sourceanchor = inf.edges[indexE].sourceAnchor;
        for (let indexN of inf.nodes.keys()) {
          if (Sourc === inf.nodes[indexN].id) {
            Deg[indexN]++;
            sourceId[indexN][targetanchor] = {
              source:source,
              sourceAnchor:sourceanchor
            };
          }
        }
      }
      for (var k = 0; k < inf.nodes.length; ) {
        for (let indexN of inf.nodes.keys()){
          if(Deg[indexN] === 0){
            k++;
            Deg[indexN]--;
            Sourc = inf.nodes[indexN].id;
            tag = inf.nodes[indexN].elabel;
            //tag = inf.nodes[indexN].label;
            attribute = inf.nodes[indexN].attr;
            labelarray = inf.nodes[indexN].labelArray;
            let labelarr = {};
            for(let i in labelarray){
              labelarr[i] = new Array();
              for(let j in labelarray[i]){
                if(labelarray[i][j][1] === true){
                  labelarr[i].push(labelarray[i][j][0]);
                }
              }
            }
            labelarray = JSON.parse(JSON.stringify(labelarr));
            stream.push({
                        'id':Sourc,
                        //"label":etag,
                        "label":tag,
                        "attribute":attribute,
                        "labelArray":labelarray,
                        "sourceId":sourceId[indexN]
                      });
            for (var i = 0; i < inf.edges.length; i++){
              if(Sourc === inf.edges[i].source){
                for (var m = 0; m < inf.nodes.length; m++){
                  if(inf.nodes[m].id === inf.edges[i].target){
                    Deg[m]--;
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log('stream:')
    console.log(stream);
    const { update, executeCommand, find } = propsAPI;
    const init={
        method: 'POST', 
        body:JSON.stringify(stream),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        credentials:'include'
        }
        fetch(
          'http://localhost:5000/run',init
        )
          .then(res => {
            if(res.status === 200){
              res.json().then(res=>{
                for(let k in res){
                  console.log(res);
                  const item = find(res[k][0]);
                  const respData = res[k][1];
                  let label = respData[0].colName.split(', ');
                  let data = respData.slice(1);
                  var Dataset = new Array();
                  for(let i in label){
                      var oneData = {};
                      oneData['label'] = label[i];
                      oneData['value'] = new Array();
                      for(let j in data){
                          if(data[j].hasOwnProperty(label[i])){
                              oneData.value.push(data[j][label[i]])
                          }
                          else oneData.value.push(null)
                      }
                      Dataset.push(oneData);
                  }
                  var length = data.length;
                  var values = {
                      Dataset:Stat(Dataset),
                      length,
                  }
                  values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
                  values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
                  update(item, {...values});
                }
              })
            }
          })
          .catch(e => console.log('错误:', e))
  }
  
  intervaltest = ()=>{   
    setInterval(()=>{
      cur++
      console.log("T1:"+cur)
    },1000)
    this.intervalRequest()
  }

  intervalRequest = ()=>{  
    if(cur<30){
      setTimeout(()=>{
        //this.transmit()
        if(cur%5==0){
          console.log("!!!!!!!:"+cur)
        }
        this.intervalRequest()

      },1000)
    }
  }
  transmit = ()=>{
    const init={
      method: 'GET', 
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      }
      fetch(
        'http://localhost:5000/JobRequest',init
      )
        .then(res => res.json())
        .then(data => {
          cur = data
        })
        .catch(e => console.log('错误:', e))
  }

  render(){
    return (
      <div>
        <Button onClick={()=>this.onClickButton()}>SparkRun</Button>
        <Button onClick={()=>this.intervaltest()}>intervalTest</Button>
      </div>
    );
  }
}

export default withPropsAPI(SparkRun);