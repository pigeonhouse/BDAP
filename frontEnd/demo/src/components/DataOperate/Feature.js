import React, {Component, Fragment} from 'react'
import { withPropsAPI } from '@src';
import { Divider } from 'antd'
import FeatureRegion from './Feature/FeatureRegion'
import FeatureGroup from './Feature/FeatureGroup'
import FillNa from './Feature/fillNa'
import Randis from './Feature/Randis'

class Feature extends Component{
    constructor(props){
        super(props);
        this.state={
            info: [],
            labelArray:[],
            stat:[]
        }
    }
    findStat(sourceID){

    }
    featureType=(tag, label)=>{
        switch(label){
            case '特征区间化':
                return  <Fragment>
                            <Divider>{tag}</Divider>
                            <FeatureRegion 
                            tag = {tag}/>
                            <Divider></Divider>
                        </Fragment>
            case '特征分组归类':
                this.findStat(this.props.sourceID);
                return  <Fragment>
                            <Divider>{tag}</Divider>
                            <FeatureGroup
                            tag = {tag}
                            stat= {this.state.stat}/>
                            <Divider></Divider>
                        </Fragment>
            case '特征二进制化':
                return <Divider>{tag}</Divider>
            }
    }
    isDynamic = (arr)=>{
        const { propsAPI } = this.props;
        const { getSelected} = propsAPI;
        const item = getSelected()[0];
        const label = item.model.label;
        switch(label){
            case '缺失值填充':
                return <Fragment>
                    填充值：<FillNa/>
                </Fragment>
            case '数据随机划分':
                return <Fragment>
                    划分比例：<Randis/>
                </Fragment>
        }
        return arr.map((item)=>{
                return  <Fragment>
                            {this.featureType(item, label)}
                        </Fragment>
            })
    }
    render(){
        var arr=[];
        let labelArray = this.props.labelArray;
        for(let i in labelArray){
            if(labelArray[i][1]){
                arr.push(labelArray[i][0]);
            }
        }
        return (
            <div>
                {this.isDynamic(arr)}
            </div>
        );
    }
}
export default withPropsAPI(Feature);