import React, { Component } from "react";

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

KeyPrinter.prototype = Object.create(ExprListener.prototype);
KeyPrinter.prototype.constructor = KeyPrinter;

// override default listener behavior
KeyPrinter.prototype.enterFloatExpr = function(ctx) {
    console.log(ctx.getText());
};

KeyPrinter.prototype.enterColumnName = function(ctx) {
  console.log(ctx.getText());
};

class MyEditor extends Component {
  componentDidMount() {
    const customMode = new CustomSqlMode();
    this.refs.aceEditor.editor.getSession().setMode(customMode);
  }
  onChange(newValue) {
    const editor = this.refs.aceEditor.editor;
    editor.getSession().setAnnotations([]);

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
        text: MyError.MyError.column, 
        type: "error"
      }]);
      MyError.MyError = undefined;
    }    
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.onClick}>Change</Button>
        <AceEditor
          ref="aceEditor"
          mode="text"
          theme="chrome"
          name="UNIQUE_ID_OF_DIV"
          onChange={this.onChange.bind(this)}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          editorProps={{ $blockScrolling: true }}
          maxLines={1}
          fontSize={30}
          showLineNumbers={false}
          annotations={[{
            row: 0, 
            column: 0, 
            text: "请输入表达式", 
            type: "error"
          }]}
          commands={[{   // commands is array of key bindings.
            name: 'commandName', //name for the key binding.
            bindKey: {win: 'Enter', mac: 'Enter'}, //key combination used for the command.
            exec: () => { console.log('key-binding used')}  //function to execute when keys are pressed.
          }]}
        />
      </div>
    );
  }
}

export default MyEditor;