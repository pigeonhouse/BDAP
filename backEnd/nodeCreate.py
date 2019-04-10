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

    def __init__(self, id, label, sourceID, attribute, labelArray):
        self.id = id
        self.label = label
        self.attribute = attribute
        self.sourceID = sourceID
        self.labelArray = labelArray
        self.file = ""

    def matchfunction(self, code):
        if self.label == "Fillna":
            data = {'code': code %(self.id, self.sourceID[0]['source'], ArraytoString(self.labelArray['public']), self.attribute['type'])}
        elif self.label == "MinMaxScaler":
            data = {'code': code %(self.id, self.sourceID[0]['source'], ArraytoString(self.labelArray['public']))}
        elif self.label =='localFile':
            data = {'code': code }
        elif self.label == 'hdfsFile':
            data = {'code': code % (self.id, self.file)}
        elif self.label == 'LogisticRegression':
            data = {'code': code % (self.id)}
        elif self.label == "TransformType":
            data = {'code': code % (self.id, ArraytoString(self.labelArray['public']), self.sourceID[0]['source'], "number")}
        elif self.label == "Stringindex":
            data = {'code': code % (self.id, ArraytoString(self.labelArray['public']), self.sourceID[0]['source'])}
        elif self.label == "SortBy":
            data = {'code': code % (self.id, self.sourceID[0]['source'], ArraytoString(self.labelArray['public']))}
        elif self.label == "StandardScaler":
            data = {'code': code % (self.id, ArraytoString(self.labelArray['public']), self.sourceID[0]['source'])}
        elif self.label == "QuantileDiscretizer":
            data = {'code': code % (self.id, ArraytoString(self.labelArray['public']), self.attribute['新生成列名'], self.sourceID[0]['source'], self.attribute['类别数'])}
        elif self.label == "OneHotEncoding":
            data = {'code': code % (self.id, ArraytoString(self.labelArray['public']), self.sourceID[0]['source'])}
        elif self.label == "LinearRegression":
            data = {'code': code % ()}
        elif self.label == "Lenet5_train":
            data = {'code': code % ()}
        else:
            data = None

        return data

    def excuted(self):
        fileobj = open("./Closed_/" + self.label + ".scala", "r")
        
        try:
            code = fileobj.read()
        finally:
            fileobj.close()
        
        data_mine = self.matchfunction(code)
        
        headers = {'Content-Type': 'application/json'}

        session_url = 'http://10.105.222.90:8998/sessions/0'

        compute = requests.post(session_url+'/statements', data=json.dumps(data_mine), headers=headers)
      
        result_url = 'http://10.105.222.90:8998' + compute.headers['location']

        r = requests.get(result_url, headers={'Content-Type': 'application/json'})
     
        print(r.json())

        while(True):
            r = requests.get(result_url, headers={'Content-Type': 'application/json'})
            if r.json()['state'] == 'available':
                print("finish")
                break

        pprint.pprint(r.json())
