/**
 * 用于前端Local模式运行的处理某个模块输入及输出
 * @param {*} stream 
 * @param {*} propsAPI 
 */
export function inputdata(stream, propsAPI){
    const { find } = propsAPI;
    var all_data = [];

    all_data.push({
      labelArray: stream.labelArray,
      all_attr: stream.attribute
    })
    const sourceId = stream.sourceId;
    for(let i in sourceId){
      let item = find(sourceId[i].source);
      if(item.model.anchor[1] === 1){
        all_data.push({
          Dataset: JSON.parse(JSON.stringify(item.model.Dataset)),
        })
      }
      else {
        all_data.push({
          Dataset: JSON.parse(JSON.stringify(item.model.Dataset[sourceId[i].sourceAnchor-item.model.anchor[0]])),
        })
      }
    }
    console.log('all_data:');
    console.log(all_data);
    return all_data;
  }
export function outputdata(id, outcome, propsAPI){
    const { find, executeCommand, update } = propsAPI;
    const item = find(id);
    executeCommand(()=>{
        update(item, {
        ...outcome
        })
    })
}