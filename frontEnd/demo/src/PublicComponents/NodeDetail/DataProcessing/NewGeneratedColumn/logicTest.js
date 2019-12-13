let lookahead = "";
let remaining = "";
let newString = "";
let op = [];
let functionList = ["abs", "add"];
let matchArray = [];
let isError = 0;
let errorInfo = null;

export function logical(inputString) {
    init();
    if (inputString === null || inputString === undefined || inputString.length === 0) {
        return { errorInfo, dataSource: matchArray };
    }

    remaining = inputString.replace(/\s*/g, "");

    nextToken();
    E();
    return { errorInfo, dataSource: matchArray };
}

function init() {
    lookahead = "";
    remaining = "";
    newString = "";
    matchArray = [];
    op = ["+", "*", "/", "(", ")", ","];
    isError = 0;
    errorInfo = null;
}

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/;
    //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    //负浮点数
    return regPos.test(val) || regNeg.test(val);
}

function isInt(val) {
    var regInt = /^-?\d+$/;
    return regInt.test(val);
}

function nextToken() {
    if (remaining.length == 0) {
        lookahead = "";
        return;
    }
    if (op.includes(remaining[0])) {
        if (remaining[0] === "(" || remaining[0] === ",") {
            op.pop("-");
        }
        lookahead = remaining[0];
        remaining = remaining.substring(1, remaining.length);
        return;
    }
    let index = 0;
    while (!op.includes(remaining[index]) && index < remaining.length) {
        if (!op.includes("-")) {
            op.push("-");
        }
        index++;
    }
    lookahead = remaining.substring(0, index)
    remaining = remaining.substring(index, remaining.length)
}

function match(token, type, func) {
    if (token != lookahead) {
        error("错误发生在: 函数" + func + " !");
        return
    }
    if (type === "Int") {
        if (!isInt(token)) {
            error(func + " 函数传参错误, 需要类型:Int!")
        }
    }
    if (type === "num") {
        newString += "$(";
        newString += lookahead;
        newString += ")";
    } else {
        newString += lookahead;
    }
    nextToken();
}

function error(info) {
    isError = 1;

    info = info ? info : "基础格式错误！";
    console.log(info);
    errorInfo = info;
}

function E() {
    if (isError) return;

    matchArray = ["()", "name", "abs()", "add(,)"];

    if (lookahead === "("
        || functionList.includes(lookahead)
        || isNumber(lookahead)
        || lookahead === "name") {
        T();
        P();
    } else {
        error();
    }
}

function P() {
    if (isError) return;
    matchArray = ["+", "-"];

    if (lookahead === "+") {
        match("+", "op", "plus");
        T();
        P();
    } else if (lookahead === "-") {
        match("-", "op", "minus");
        T();
        P();
    }
}

function T() {
    if (isError) return;
    matchArray = ["()", "name", "abs()", "add(,)"];

    if (lookahead === "("
        || functionList.includes(lookahead)
        || isNumber(lookahead)
        || lookahead === "name") {
        F();
        M();
    } else {
        error();
    }
}

function M() {
    if (isError) return;
    matchArray = ["*", "/"];

    if (lookahead === "*") {
        match("*", "op", "mutiply");
        F();
        M();
    } else if (lookahead === "/") {
        match("/", "op", "divide");
        F();
        M();
    }
}

function F() {
    if (isError) return;
    matchArray = ["()", "name", "abs()", "add(,)"];

    if (lookahead === "(") {
        match("(", "op", "LB");
        E();
        match(")", "op", "RB");
    } else if (lookahead === "abs") {
        match("abs", "func", "abs");
        match("(", "op", "abs");
        G();
        match(")", "op", "abs");
    } else if (lookahead === "add") {
        match("add", "func", "add");
        match("(", "op", "add");
        G();
        match(",", "op", "add");
        match(lookahead, "Int", "add");
        match(")", "op", "add");
    } else if (isNumber(lookahead)) {
        match(lookahead, "num", "num");
    } else if (lookahead === "name") {
        match(lookahead, "name", "name");
    } else {
        error();
    }
}

function G() {
    if (isError) return;
    matchArray = ["()", "name", "abs()", "add(,)"];

    if (lookahead === "("
        || functionList.includes(lookahead)
        || isNumber(lookahead)
        || lookahead === "name") {
        E()
    } else {
        error("缺失参数!")
    }
}