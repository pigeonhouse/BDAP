import React, { Component } from "react";
import { List ,Button } from 'antd';
import AceEditor from "react-ace";
import CustomSqlMode from "./CustomSqlMode.js";

import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-min-noconflict/ext-language_tools";

var MyError = require('./MyError')
var antlr4 = require('./parser/antlr4/index');

var ExprLexer = require('./parser/ExprLexer').ExprLexer;
var ExprParser = require('./parser/ExprParser').ExprParser;
var ExprListener = require('./parser/ExprListener').ExprListener;

var KeyPrinter = function() {
  ExprListener.call(this); // inherit default listener
  return this;
};

var data = [];

KeyPrinter.prototype = Object.create(ExprListener.prototype);
KeyPrinter.prototype.constructor = KeyPrinter;



KeyPrinter.prototype.enterColumnName = function(ctx) {
  console.log(ctx.getText());
};


class MyEditor extends Component {
  state={
    showData:[""],
    vocabulary:[],
   
  }
  componentWillMount()
  {
      //使用xhr请求获取g4文法文件
      /*let xhr = new XMLHttpRequest(),
      okStatus = document.location.protocol === "file:" ? 0 : 200;
      xhr.open('GET', './src/PublicComponents/GenerateColumn/jsParser/parser/Expr.g4', false);
      xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
      xhr.send(null);
      let text=xhr.responseText;
      console.log(text)
      let rows= text.split("\n");
      let i=0;
      while (rows[i].indexOf("#functions")==-1&&i<rows.length)
      {i++;
      console.log(rows[i])

      }
      i+=2;
      while(rows[i].indexOf("#functions-end")==-1&&i<rows.length)
      {
        var info=rows[i].split('#');
        var re = new RegExp("[\u4e00-\u9fa5|a-z|A-Z]{2,}");
        let tmp=info.length==2?info[0].match(re):rows[i].match(re);
        let tuple={
          name:'name',
          value:tmp[0],
          meta:info.length==2?info[1]:"",
        }
        console.log(tmp)
        this.state.vocabulary.push(tuple)
        i++;
        
      }*/


  }
  componentDidMount() {
    const customMode = new CustomSqlMode();
    this.refs.aceEditor.editor.getSession().setMode(customMode);
  }
  complete(editor) {
    const {columns}=this.props;
    //向编辑器中添加自动补全列表
    editor.completers.push({
      getCompletions(editor, session, pos, prefix, callback) {
        callback(null, columns);
      },

    });
  }
  onChange = (newValue) => {
    const editor = this.refs.aceEditor.editor;
    editor.getSession().setAnnotations([]);
    data=[];
    this.setState({
      value: newValue
    });

    var input = newValue;
    var chars = new antlr4.InputStream(input);
    var lexer = new ExprLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new ExprParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.e();
    var printer = new KeyPrinter();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);

    if(MyError.MyError != undefined){
      editor.getSession().setAnnotations([{
        row: 0, 
        column: 0, 
        text: "第" + MyError.MyError.column + "个字符处存在错误，错误为"+ MyError.MyError.msg, 
        type: "error"
      }]);
      MyError.MyError = undefined;
    }
    
    this.setState({
      showData: data
    });
  }
  onClick=()=>{

    console.log(this.state.value);
  }
  render() {
    const {vocabulary}=this.state;
    return (
      
      <div>
        <AceEditor
          ref="aceEditor"
          mode="text"
          theme="chrome"
          placeholder="请在此处输入表达式"
          width="100%"
          value={this.state.value}
          name="UNIQUE"
          onChange={this.onChange}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
            setOptions={{
            showLineNumbers: false,
            maxLines:1,
            fontSize:30
          }}
          annotations={[{
            row: 0, 
            column: 0, 
            text: "请输入表达式", 
            type: "error"
          }]}
          commands={[{  
            name: 'commandName', 
            bindKey: {win: 'Enter', mac: 'Enter'}, 
            exec: () => { console.log('key-binding used')}  
          }]}
          onLoad={this.complete.bind(this)}
        />
        <Button text="点击进行语义检查并提交" onClick={this.onClick}></Button>
        <div></div>
        <List
          bordered
          dataSource={this.state.showData}
          renderItem={item => (
            <List.Item>{item}</List.Item>
          )}
        />

      </div>
      
    );
  }
}

export default MyEditor;