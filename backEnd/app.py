from flask import Flask, render_template, request
from flask_cors import CORS
import json, pprint, requests, textwrap

global inputData
global runningData


def ArraytoString(Array):
    String = ""

    for i in range(0, len(Array)):
        if i == len(Array) - 1:
            String = String + Array[i]
        else:
            String = String + Array[i] + " "

    return String

class nodes:

    def __init__(self, id, label, sourceID, attribute):
        self.id = id
        self.label = label
        self.attribute = attribute
        self.sourceID = sourceID

    def matchfunction(self, code):
        if self.label == "Input":
            data = {'code': code % (self.attribute['sourceFile'], self.id)}
        elif self.label == "缺失值填充":
            data = {'code': code % (self.attribute['type'], self.id, ArraytoString(self.sourceID))}
        elif self.label == "归一化":
            data = {'code': code % (self.id, ArraytoString(self.sourceID))}
        elif self.label =='localFile':
            data = {'code':code }
        else:
            data = None

        return data

    def excuted(self):
        fileobj = open("./Closed/" + self.label + ".scala", "r")
        
        try:
            code = fileobj.read()
        finally:
            fileobj.close()
        
        data_mine = self.matchfunction(code)
        
        session_url = 'http://10.105.222.90:8998/sessions/0'
        compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)
      
        result_url = host + compute.headers['location']

        r = requests.get(result_url, headers=headers)
     
        print(r.json())

        while(True):
            r = requests.get(result_url, headers=headers)
            if r.json()['state'] == 'available':
                print("finish")
                break

        pprint.pprint(r.json())


app = Flask(__name__, static_folder="./front_end/static", template_folder="./front_end/")
CORS(app)

@app.route('/InputPost', methods=['GET', 'POST'])
def InputPost():
    print(request.json)
    global inputData
    inputData = request.json
    return "received"

@app.route('/RunningPost', methods=['GET', 'POST'])
def RunningPost():
    print(request.json)
    global runningData
    runningData = request.json
    return "received"



@app.route('/')
def hello_world():
    return render_template('index.html')

host = 'http://10.105.222.90:8998'
headers = {'Content-Type': 'application/json'}
global loss

def convertPost(data):
    colName = data['colName'].split(",")
    s = []
    for name in colName:
        temp = {}
        temp['label'] = name
        temp['value'] = data[name].split(",")
        s.append(temp)
    re = [s]
    re.append([colName])
    re.append(len(data[name].split(",")))
    return re


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
    compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)

    result_url = host + compute.headers['location']

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

@app.route('/run', methods=['GET', 'POST'])
def run():
    print(request.json)
    picture = request.json
    node_ = []
    for i in range(0, len(picture)):
        node = nodes(picture[i]['id'], picture[i]['label'], picture[i]['sourceId'], picture[i]['attribute'])
        node_.append(node)

    finalData = []
    for node in node_:
        print(node.label)
        node.excuted()
        temp = [node.id,convertPost(runningData)]
        finalData.append(temp)
        runningData = []
    
    print(finalData)

    return json.dumps(finalData)


    # data_mine = {'kind': 'spark'}
    # create_session = requests.post(host + '/sessions', data=json.dumps(data_mine), headers=headers)
    # session_url = host + create_session.headers['location']

    # while(True):
    #     r = requests.get(session_url, headers=headers)
    #     if r.json()['state'] == 'idle':
    #         print("started")
    #         break

    # code above aims for open a new livy session, it is suggested to open it in andvance to avoid wasting time

    # requests.delete(session_url, headers=headers)
    # close the session, if you open the session outside this file, ignore it


@app.route('/realTime', methods=['GET', 'POST'])  # for transferring data while training
def realTime():
    global loss
    loss = float(request.args.get("loss"))
    return "realTime test received"


@app.route('/returnLoss', methods=['GET', 'POST'])  # for returning data to front-end
def returnLoss():
    print(loss)
    return json.dumps({"loss": "%f" % loss})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


