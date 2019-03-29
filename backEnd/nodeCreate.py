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
        elif self.label =='Fillna':
            data = {'code':code }
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
