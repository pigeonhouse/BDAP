from flask import Flask, render_template, request
from flask_cors import CORS
import json, pprint, requests, textwrap
from convertPost import convertPost
import nodeCreate

global inputData
global runningData

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

host = 'http://10.105.222.90:8998'
headers = {'Content-Type': 'application/json'}
global loss

@app.route('/handleInput', methods=['GET', 'POST']) 
def handleInput():
    print(request.json)
    fileobj = open("./handleInput.scala", "r")

    try:
        code = fileobj.read()
    finally:
        fileobj.close()

    data_mine = {'code':code % request.json}


    headers = {'Content-Type': 'application/json'}
    session_url = 'http://10.105.222.90:8998/sessions/0'
    compute = requests.post(session_url + '/statements', data=json.dumps(data_mine), headers=headers)

    result_url = 'http://10.105.222.90:8998' + compute.headers['location']

    r = requests.get(result_url, headers=headers)
    print(r.json())

    while(True):
        r = requests.get(result_url, headers=headers)
        if r.json()['state'] == 'available':
            print("finish")
            break

    pprint.pprint(r.json())

    data = convertPost(inputData)
    print(data)

    return json.dumps(data)

#处理第一次读取文件时scala传来的post请求
@app.route('/InputPost', methods=['GET', 'POST'])
def InputPost():
    print(request.json)
    global inputData
    inputData = request.json
    return "received"


#处理scala运行时的post请求
@app.route('/RunningPost', methods=['GET', 'POST'])
def RunningPost():
    print(request.json)
    global runningData
    runningData = request.json
    return "received"

##任务完成进度测试
# @app.route('/JobRequest', methods=['GET', 'POST'])
# def JobRequest():
#     global jobCompleted
#     jobCompleted += 3
#     return json.dumps(jobCompleted)


#处理前端传来的图信息并按步执行
@app.route('/run', methods=['GET', 'POST'])
def run():
    print(request.json)
    picture = request.json
    node_ = []
    for i in range(0, len(picture)):
        node = nodes(picture[i]['id'], picture[i]['label'], picture[i]['sourceId'], picture[i]['attribute'], picture[i]['labelArray'])
        node_.append(node)

    finalData = []
    for node in node_:
        print(node.label)
        node.excuted()
       
        if node.label != "hdfsFile":
            temp = [node.id, runningData]
            finalData.append(temp)

    
    print(finalData)

    return json.dumps(finalData)


    # data_mine = {'kind': 'spark'}
    # create_session = requests.post('http://10.105.222.90:8998' + '/sessions', data=json.dumps(data_mine), headers=headers)
    # session_url = 'http://10.105.222.90:8998' + create_session.headers['location']

    # while(True):
    #     r = requests.get(session_url, headers=headers)
    #     if r.json()['state'] == 'idle':
    #         print("started")
    #         break

    ## 创建session

    # requests.delete(session_url, headers=headers)
    ##关闭session 


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
