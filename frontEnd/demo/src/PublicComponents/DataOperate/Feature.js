import React, {Component, Fragment} from 'react'
import { withPropsAPI } from '@src';
import { Divider, Row, Col } from 'antd'
import FeatureRegion from './Feature/FeatureRegion'
import FeatureGroup from './Feature/FeatureGroup'
import FillNa from './Feature/fillNa'
import Randis from './Feature/Randis'
import TypeChange from './Feature/TypeChange'
import DataFilter from './Feature/DataFilter/DataFilter'
import DataFilterA from './Feature/DataFilter/DataFilterA'

class Feature extends Component{
    constructor(props){
        super(props);
        this.state={
            info: [],
            labelArray:[],
        }
    }
    findStat(sourceID, tag, sourceAnchor){
        const { propsAPI } = this.props;
        const { find } = propsAPI;
        const sourceItem = find(sourceID);
        const { Dataset, anchor } = sourceItem.getModel();
        if(Dataset){
            if(anchor[1] !== 1){
                if(sourceAnchor === 1){
                    Dataset = Dataset[0];
                }
                else {
                    Dataset = Dataset[1];
                }
            }
            for(let i in Dataset){
                if(Dataset[i].label === tag){
                    if(Dataset[i].stat.type === 'string')
                    return Dataset[i].stat.value;
                    else return [];
                }
            }
        }
        else {
            if(anchor[0] === 1){
                const edges = propsAPI.save().edges;
                for(let i in edges){
                    if(edges[i].target === sourceID){
                        return this.findStat(edges[i].source, tag, edges[i].sourceAnchor);
                    }
                }
                return [];
            }
        }
    }
    findStatFirst=(sourceID, tag)=>{
        const { propsAPI } = this.props;
        const { find, getSelected } = propsAPI;
        const sourceItem = find(sourceID);
        const { Dataset, anchor } = sourceItem.getModel();
        const item = getSelected()[0];
        if(Dataset.length !== 0){
            if(anchor[1] !== 1){
                const edges = propsAPI.save().edges;
                for(let i in edges){
                    if(edges[i].source === sourceID && edges[i].target === item.id){
                        if(edges[i].sourceAnchor === 1){
                            Dataset = Dataset[0];
                        }
                        else {
                            Dataset = Dataset[1];
                        }
                        break;
                    }
                }
            }
            for(let i in Dataset){
                if(Dataset[i].label === tag){
                    if(Dataset[i].stat.type === 'string')
                    return Dataset[i].stat.value;
                    else return [];
                }
            }
        }
        else {
            if(sourceItem.model.group === 'input' || sourceItem.model.group === 'feature'){
                const edges = propsAPI.save().edges;
                for(let i in edges){
                    if(edges[i].target === sourceID){
                        return this.findStat(edges[i].source, tag, edges[i].sourceAnchor);
                    }
                }
                return [];
            }
        }
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
                let Stat = this.findStatFirst(this.props.sourceID, tag);
                return  <Fragment>
                            <Divider>{tag}</Divider>
                            <FeatureGroup
                            tag = {tag}
                            stat = {Stat}/>
                            <Divider></Divider>
                        </Fragment>
            case '数据类型转换':
                return  <Fragment>
                            <Divider>{tag}</Divider>
                            <TypeChange 
                            tag = {tag}/>
                            <Divider></Divider>
                        </Fragment>
            case 'one-hot编码':
                return;
            case '数据筛选':
                return <Fragment>
                            <Divider>{tag}</Divider>
                            <DataFilter 
                            tag = {tag}/>
                            <Divider></Divider>
                        </Fragment>
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
                    <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={8}>
                            划分比例：
                        </Col>
                        <Col span={14}>
                            <Randis/>
                        </Col>
                    </Row>
                </Fragment>
            case '数据筛选':
                if(arr.length)
                return <Fragment>
                    列间关系：<DataFilterA/>
                    {
                        arr.map((item)=>{
                            return  <Fragment>
                                        {this.featureType(item, label)}
                                    </Fragment>
                        })
                    }
                </Fragment>
        }
        return arr.map((item)=>{
                return  <Fragment>
                            {this.featureType(item, label)}
                        </Fragment>
            })
    }
    componentWillReceiveProps(nextProps){
        const { propsAPI } = this.props;
        const { getSelected, update } = propsAPI;
        const item = getSelected()[0];
        const attr = item.model.attr;
        const nextLabelArray = nextProps.labelArray;
        var nextarr=[];
        for(let i in nextLabelArray){
            if(nextLabelArray[i][1]){
                nextarr.push(nextLabelArray[i][0]);
            }
        }
        var arr=[];
        let labelArray = this.props.labelArray;
        for(let i in labelArray){
            if(labelArray[i][1]){
                arr.push(labelArray[i][0]);
            }
        }
        for(let i in arr){
            if(nextarr.indexOf(arr[i]) === -1){
                delete attr[arr[i]];
            }
        }
        update(item, {attr});
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