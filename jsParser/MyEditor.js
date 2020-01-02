import React, { Component } from "react";
import { List } from 'antd';
import AceEditor from "react-ace";
import CustomSqlMode from "./CustomSqlMode.js";

import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-min-noconflict/ext-language_tools";

var MyError = require('./MyError')
var antlr4 = require('antlr4/index');

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

KeyPrinter.prototype.enterAddExpr = function(ctx) {
  data.push("E -> E + E");
};

KeyPrinter.prototype.enterMinusExpr = function(ctx) {
  data.push("E -> E - E");
};

KeyPrinter.prototype.enterMutipleExpr = function(ctx) {
  data.push("E -> E * E");
};

KeyPrinter.prototype.enterDivideExpr = function(ctx) {
  data.push("E -> E / E");
};

KeyPrinter.prototype.enterBracketExpr = function(ctx) {
  data.push("E -> ( E )");
};

KeyPrinter.prototype.enterNumberExpr = function(ctx) {
  data.push("E -> number");
};

KeyPrinter.prototype.enterFunction = function(ctx) {
  data.push("E -> function( E )");
};

KeyPrinter.prototype.enterColumnName = function(ctx) {
  console.log(ctx.getText());
};

class MyEditor extends Component {
  state={
    showData:[""]
  }
  componentDidMount() {
    const customMode = new CustomSqlMode();
    this.refs.aceEditor.editor.getSession().setMode(customMode);
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
        text: "第" + MyError.MyError.column + "个字符处存在错误,错误为"+MyError.MyError.msg, 
        type: "error"
      }]);
      MyError.MyError = undefined;
    }
    
    this.setState({
      showData: data
    });
  }
  
  render() {
    return (
      <div>
        <AceEditor
          ref="aceEditor"
          mode="text"
          theme="chrome"
          placeholder="请在此处输入表达式"
          width="100%"
          value={this.state.value}
          name="UNIQUE_ID_OF_DIV"
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
        />
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