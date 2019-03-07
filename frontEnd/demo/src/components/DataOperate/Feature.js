import React, {Component} from 'react'
import { withPropsAPI } from '@src';
import { Divider } from 'antd'
import FeatureRegion from './FeatureRegion.js'
import FeatureGroup from './FeatureGroup.js'
import FeatureBinary from './FeatureBinary.js'

class Feature extends Component{
    constructor(props){
        super(props);
        this.state={
            info: [],
            labelArray:[]
        }
    }
    shouldComponentUpdate(){
      if(this.state.labelArray.length === 0)
      return true;
      const { propsAPI } = this.props;
      const { getSelected } = propsAPI;
      const item = getSelected()[0];
      for(let i in item.model.labelArray){
        if(item.model.labelArray[i][1] !== this.state.labelArray[i][1]){
          return true;
        }
      }
      return false;
    }
    featureType=(tag)=>{
      const { propsAPI } = this.props;
      const { getSelected } = propsAPI;
      const item = getSelected()[0];
      if(item.model.label === '特征区间化'){
        return <FeatureRegion 
              tag = {tag}/>
      }
      else if(item.model.label === '特征分组归类')
      return <FeatureGroup
              tag = {tag}/>
      else return <FeatureBinary
              tag = {tag}/>
    }
    render(){
        var arr=[];
        let labelArray
        if(this.props.labelArray){
          labelArray = this.props.labelArray;
        }
        else labelArray = this.state.labelArray;
        for(let i in labelArray){
            if(labelArray[i][1]){
                arr.push(labelArray[i][0]);
            }
        }
        return (
            <div>
                {arr.map((item)=>{
                    return  <div>
                            <Divider>{item}</Divider>
                            {this.featureType(item)}
                            <Divider></Divider>
                        </div>
                })}
            </div>
        );
    }
}
export default withPropsAPI(Feature);