import numpy as np
import time

def my_test():
    for i in range(20):
        time.sleep(2)
        f =  open('C:\\Users\\Surface\\SavedFile\\test.txt', 'w')
        f.write(str(i))
        f.close()

my_test()