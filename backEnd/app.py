from flask import Flask, render_template, request
from flask_cors import CORS
import json, pprint, requests, textwrap


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

        session_url = 'http://localhost:8998/sessions/0'
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

global returnData

@app.route('/postTest', methods=['GET', 'POST'])
def postTest():
    print(request.json)
    global returnData
    returnData = request.json
    return "received"


@app.route('/')
def hello_world():
    return render_template('index.html')

host = 'http://localhost:8998'
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
    session_url = 'http://localhost:8998/sessions/0'
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

    data = returnData

    colName = data['colName'].split(",")
    s = []
    for name in colName:
        temp = [{}]
        temp[0]['label'] = name
        temp[0]['value'] = data[name].split(",")
        s.append(temp)
    re = [s]
    re.append([colName])
    re.append(len(data[name].split(",")))

    return json.dumps(re)



@app.route('/test', methods=['GET', 'POST'])
def test():
    print(request.json)
    picture = request.json
    node_ = []
    for i in range(0, len(picture)):
        node = nodes(picture[i]['id'], picture[i]['label'], picture[i]['sourceId'], picture[i]['attribute'])
        node_.append(node)

    for node in node_:
        print(node.label)
        node.excuted()

    
    return ("finish")


    # data_mine = {'code': code }

    # session_url = 'http://localhost:8998/sessions/0'
    # compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)

    # result_url = host + compute.headers['location']

    # r = requests.get(result_url, headers=headers)
    # print(r.json())

    # while(True):
    #     r = requests.get(result_url, headers=headers)
    #     if r.json()['state'] == 'available':
    #         print("finish")
    #         break

    # pprint.pprint(r.json())

    # return "finish"

    # data_mine = {'kind': 'spark'}
    # create_session = requests.post(host + '/sessions', data=json.dumps(data_mine), headers=headers)
    # session_url = host + create_session.headers['location']

    # while(True):
    #     r = requests.get(session_url, headers=headers)
    #     if r.json()['state'] == 'idle':
    #         print("started")
    #         break

    # code above aims for open a new livy session, it is suggested to open it in andvance to avoid wasting time

    # inf = request.json          # information get from the front-end
    # r = 0
    # inputName = inf[0]["attribute"]["sourceFile"]
    # outputName = ""

    # for index in range(1,len(inf)):
    #     print(inf[index]["label"])

    #     if inf[index]["label"] == "FillNa":

    #         fileobj = open('./DataPreprocessing/FillNa.scala', 'r')     # open scala file where your spark code lies
    #         fillingNumber = inf[index]["attribute"]["fillingNumber"]
    #         outputName = inputName + "_afterFillNa"

    #         try:
    #             code = fileobj.read()
    #         finally:
    #             fileobj.close()

    #         data_mine = {'code': code % (inputName+'.json',fillingNumber,outputName+'.json')}

    #         session_url = 'http://localhost:8998/sessions/0'
    #         compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)

    #         result_url = host + compute.headers['location']

    #         r = requests.get(result_url, headers=headers)
    #         print(r.json())

    #         while(True):
    #             r = requests.get(result_url, headers=headers)
    #             if r.json()['state'] == 'available':
    #                 print("finish")
    #                 break

    #         pprint.pprint(r.json())

    #         inputName = outputName

    #     elif inf[index]["label"] == "MaxMinScaler":
    #         fileobj = open('./DataPreprocessing/MaxMinScaler.scala', 'r')
    #         outputName = inputName + "_afterMaxMinScaler"

    #         try:
    #             code = fileobj.read()
    #         finally:
    #             fileobj.close()

    #         data_mine = {'code': code % (inputName+'.json',outputName+'.json')}

    #         session_url = 'http://localhost:8998/sessions/0'
    #         compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)

    #         result_url = host + compute.headers['location']

    #         r = requests.get(result_url, headers=headers)
    #         print(r.json())

    #         while(True):
    #             r = requests.get(result_url, headers=headers)
    #             if r.json()['state'] == 'available':
    #                 print("finish")
    #                 break

    #         pprint.pprint(r.json())

    #         inputName = outputName

    #     print(inf[index]["attribute"])

    # requests.delete(session_url, headers=headers)

    # close the session, if you open the session outside this file, ignore it

    # return r.text

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


