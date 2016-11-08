import re
file = open('access.log' , 'r')
setOne = set()

for lineOne in file.readlines():
    result = re.findall('\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', lineOne)
    setOne.update(result)

setOne = list(setOne)
setTwo=set()
for lineTwo in setOne:
    result = re.findall('(\d{1,3}\.\d{1,3}\.\d{1,3}\.)\d{1,3}', lineTwo)
    setTwo.update(result)

setTwo = list(setTwo)
for lineTwo in setTwo:
    for lineThree in setOne:
        if lineThree.startswith(lineTwo):
            print(lineThree)
