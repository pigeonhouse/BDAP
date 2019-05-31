import React, { Component } from 'react'
import { Button,Icon,message} from 'antd'
import { withPropsAPI } from '@src';

import { OneVarLinearRegression } from '../Processor/MachineLearning/Regression/OneVarLinearRegression'
import { NaiveBayes } from '../Processor/MachineLearning/Classification/NaiveBayes'
import { MutiVarLinearRegression } from '../Processor/MachineLearning/Regression/MutiVarLinearRegression'
import { OneVarPolynomialRegression } from '../Processor/MachineLearning/Regression/OneVarPolynomialRegression'
import { DecisionTreeRegression } from '../Processor/MachineLearning/Regression/DecisionTree'
import { RandomForest } from '../Processor/MachineLearning/Regression/RandomForest'
import { SVM } from '../Processor/MachineLearning/Classification/SVM'

import { fillNa } from '../../PublicComponents/DataOperate/DataProcess/fillNa'
import { Onehot } from '../../PublicComponents/DataOperate/DataProcess/Onehot'
import { Randis } from '../../PublicComponents/DataOperate/DataProcess/Randis'
import { SeprtbyFeat } from '../../PublicComponents/DataOperate/DataProcess/SeprtbyFeat'
import { StrToNum } from '../../PublicComponents/DataOperate/DataProcess/StrToNum';
import { Nomalize } from '../../PublicComponents/DataOperate/DataProcess/Nomalize';

import { inputdata } from './streamRunner'
import { outputdata } from './streamRunner'
import { generateStream } from '../../PublicComponents/HandleStream/generateStream'
import { isLegal } from '../../PublicComponents/HandleStream/isLegal'

/**
 * Run组件，点击Button后执行画布上组件对应的流程
 */

var current = 0;
class Run extends Component{
  onClickButton = ()=>{
    const { propsAPI } = this.props;
    const stream = generateStream(propsAPI);
    console.log(stream);
    this.run(stream);
  }
  run = (stream)=>{
    const { propsAPI } = this.props;
    if(isLegal(propsAPI))  return ;
    setTimeout(()=>{
      if(current !== stream.length){
        let k = current;
        const all_data = inputdata(stream[k], propsAPI);
        console.log(all_data)
        var outcome = new Array()
        if(stream[k].label !== '本地数据'){
          const { find } = propsAPI;
          const item = find(stream[k].id);
          const group = item.model.group;
          if(group == "feature"){
            if(stream[k].label !== '数据随机划分'){
              if(!all_data[0].labelArray.hasOwnProperty('public')){
                message.error("还没有选择字段，请在右边参数栏点击选择字段");
                const { find, update, executeCommand } = propsAPI;
                const nextitem = find(stream[k].id);
                var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
                value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
                executeCommand(() => {
                  update(nextitem, {keyConfig:{...value}});
                });
                return ;
              } 
            }
          }
          else if(group == 'ml'){
            if(all_data[0].labelArray.train_x.length == 0 || all_data[0].labelArray.train_y.length == 0
            || all_data[0].labelArray.predict_x.length == 0){
              message.error("还没有选择完字段，请在右边参数栏点击选择字段");
                const { find, update, executeCommand } = propsAPI;
                const nextitem = find(stream[k].id);
                var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
                value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
                executeCommand(() => {
                  update(nextitem, {keyConfig:{...value}});
                });
                return 0;
            }
          }
          switch (stream[k].label) {
            case '单变量线性回归':
                outcome = OneVarLinearRegression(all_data);
                break
            case '多变量线性回归':
                outcome = MutiVarLinearRegression(all_data);
                break
            case '单变量多项式回归':
                outcome = OneVarPolynomialRegression(all_data);
                break
            case '决策树回归':
                outcome = DecisionTreeRegression(all_data);
                break
            case '随机森林回归':
                outcome = RandomForest(all_data);
                break
            case '朴素贝叶斯':
                outcome = NaiveBayes(all_data)
                break
            case '支持向量机':
                outcome = SVM(all_data)
                break
            case '数据随机划分':
                outcome = Randis(all_data)
                break
            case '特征区间化':
                outcome = SeprtbyFeat(all_data)
                break  
            case '特征分组归类':
                outcome = StrToNum(all_data)
                break
            case 'one-hot编码':
                outcome = Onehot(all_data)
                break
            case '缺失值填充':
                outcome = fillNa(all_data);
                break
            case '归一化':
                outcome = Nomalize(all_data);
                break
            default:
              break;
          }
          outputdata(stream[k].id, outcome, propsAPI);
          const { update, executeCommand } = propsAPI;
          const currentitem = find(stream[k].id);
          var value = JSON.parse(JSON.stringify(currentitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
          executeCommand(() => {
            update(currentitem, {keyConfig:{...value}});
          });
        }
        if(k < stream.length-1 && stream[k+1].label !== '本地数据'){
          const { find, update, executeCommand } = propsAPI;
          const nextitem = find(stream[k+1].id);
          var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
          executeCommand(() => {
            update(nextitem, {keyConfig:{...value}});
          });
        }
        current++;
        if(current === stream.length){
          current = 0;
          console.log("最终图信息")
          console.log(propsAPI.save())
          console.log("-------------------------------")
          message.success("成功执行完毕!")
        }
        else this.run(stream);
      }
    },1000)
  }
  render(){
    return (
        <Button onClick={()=>this.onClickButton()} style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}}>
            <Icon type="play-circle" style={{fontSize:25}}/>运行
        </Button>
    );
  }
}

export default withPropsAPI(Run);