from flask import Flask, render_template,request
from flask_cors import CORS
import json, pprint, requests, textwrap

app = Flask(__name__,static_folder="./front_end/static", template_folder="./front_end/")

CORS(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

host = 'http://localhost:8998'
headers = {'Content-Type': 'application/json'}
global loss

@app.route('/test', methods=['GET', 'POST'])
def test():
    inf = request.json          # information get from the front-end
    r = 0
    inputName = inf[0]["attribute"]["sourceFile"]
    outputName = ""

    for index in range(1,len(inf)):
        print(inf[index]["label"])
        
        if inf[index]["label"] == "FillNa":

            fileobj = open('./DataPreprocessing/FillNa.scala', 'r')     # open scala file where your spark code lies
            fillingNumber = inf[index]["attribute"]["fillingNumber"]
            outputName = inputName + "_afterFillNa"

            try:
                code = fileobj.read()
            finally:
                fileobj.close()

            data_mine = {'code': code % (inputName+'.json',fillingNumber,outputName+'.json')}

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

            inputName = outputName

        elif inf[index]["label"] == "MaxMinScaler":
            fileobj = open('./DataPreprocessing/MaxMinScaler.scala', 'r')
            outputName = inputName + "_afterMaxMinScaler"

            try:
                code = fileobj.read()
            finally:
                fileobj.close()

            data_mine = {'code': code % (inputName+'.json',outputName+'.json')}

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

            inputName = outputName



        print(inf[index]["attribute"])

    
    # data_mine = {'kind': 'spark'}
    # create_session = requests.post(host + '/sessions', data=json.dumps(data_mine), headers=headers)
    # session_url = host + create_session.headers['location']

    # while(True):                
    #     r = requests.get(session_url, headers=headers)
    #     if r.json()['state'] == 'idle':
    #         print("started")
    #         break

    # code above aims for open a new livy session, it is suggested to open it in andvance to avoid wasting time 

    
    #requests.delete(session_url, headers=headers)  
        
    #close the session, if you open the session outside this file, ignore it

    return r.text

@app.route('/realTime', methods=['GET', 'POST'])        # for transferring data while training
def realTime():
    global loss
    loss=float(request.args.get("loss"))
    return "realTime test received"

@app.route('/returnLoss', methods=['GET', 'POST'])      # for returning data to front-end
def returnLoss():
    print(loss)
    return json.dumps({"loss":"%f"%loss})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


