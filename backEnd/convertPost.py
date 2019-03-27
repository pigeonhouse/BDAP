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
