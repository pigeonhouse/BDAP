import tensorflow as tf
import tensorflow.examples.tutorials.mnist.input_data as input_data
import tensorflow.contrib.slim as slim
import numpy as np
import json
mnist = input_data.read_data_sets("/tmp/mnist/", one_hot=True)

#   conv1   conv2   fc  acc all with batchnorm
#   1       2    100 0.97
#   2       4   100 0.9844
#   4       8   100 0.9894
#   6       12  100 0.9912
#   8       16  100 0.9904
#   6       12  50  0.9912
#   6       12  200 0.9922
#   32      64  200 0.9929
#   32      64  500 0.9919
#*  128     256 100 0.9955

#without batchnnorm
#   6  12  100  0.9841

#make it biggger if your gpu memory is not enough
test_batch_size=100

def lenet_batchnorm(input,is_training):
    batch_norm_params={"is_training":is_training,"decay":0.9}
    #, "updates_collections": None
    with slim.arg_scope([slim.conv2d,slim.fully_connected],weights_regularizer=slim.l2_regularizer(0.0005),
                        normalizer_fn=slim.batch_norm,normalizer_params=batch_norm_params):
        net=slim.conv2d(input,6,[5,5],scope="conv1")
        net=slim.max_pool2d(net,[2,2],scope="pool1")
        net=slim.conv2d(net,12,[5,5],scope="conv2")
        net=slim.max_pool2d(net,[2,2],scope="pool2")
        net=slim.flatten(net,scope="flatten")
        net=slim.fully_connected(net,100,scope="fc3")
        net=slim.dropout(net,is_training=is_training,scope="dropout")
        net=slim.fully_connected(net,10,activation_fn=None,normalizer_fn=None,scope="prob")
        return net

def train():
    is_training = tf.placeholder(tf.bool, name='MODE')
    x=tf.placeholder(tf.float32,shape=[None,784])
    y_=tf.placeholder(tf.float32,shape=[None,10])
    image=tf.reshape(x,[-1,28,28,1])
    with tf.name_scope("image"):
        tf.summary.image("image",image)

    y=lenet_batchnorm(image,is_training)

    loss=tf.nn.softmax_cross_entropy_with_logits(labels=y_,logits=y)#slim.losses.softmax_cross_entropy(y,y_)
    global_step=slim.get_or_create_global_step()#tf.Variable(0)
    learning_rate=tf.train.exponential_decay(0.0001,global_step,100,0.95,staircase=True)


    update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS)
    with tf.control_dependencies(update_ops):
        train_op = tf.train.AdamOptimizer(0.01).minimize(loss, global_step=global_step)

    correct_prediction=tf.equal(tf.argmax(y,axis=1),tf.argmax(y_,axis=1))
    accuracy=tf.reduce_mean(tf.cast(correct_prediction,tf.float32))
    tf.summary.scalar("acc",accuracy)
    tf.summary.scalar("loss",tf.reduce_sum(loss))
    tf.summary.scalar("learning_rate",learning_rate)
    merged_summary=tf.summary.merge_all()
    saver=tf.train.Saver()

    with tf.Session()as sess:
        writer=tf.summary.FileWriter("log",sess.graph)
        sess.run(tf.global_variables_initializer())
        for i in range(1000):
            batch=mnist.train.next_batch(100)
            summary,train_acc,learning,train_loss=sess.run([merged_summary,accuracy,learning_rate,loss],feed_dict={x:batch[0],y_:batch[1],is_training:False})
            writer.add_summary(summary,i)
            print(str(i)+"accuracy:"+str(train_acc))
            print(str(i)+"learning_rate:"+str(learning))
            print(str(i)+"loss:"+str(np.sum(train_loss)))
            inf={}
            f =  open('/home/tseg/inf.txt', 'w')
            inf["accuracy"] = str(train_acc)
            inf["learning_rate"] = str(learning)
            inf["loss"] = str(np.sum(train_loss))
            f.write(json.dumps(inf))
            f.close()
            sess.run(train_op,feed_dict={x:batch[0],y_:batch[1],is_training:True})
        #eval_acc=sess.run(accuracy,feed_dict={x:mnist.test.images,y_:mnist.test.labels,is_training:False})
        acc = 0
        for batch in range(10000//test_batch_size):
            batch = mnist.test.next_batch(test_batch_size)
            acc += sess.run(accuracy, feed_dict={x:batch[0],y_:batch[1], is_training:False})
        eval_acc=acc/(10000//test_batch_size)
        print("test acc"+str(eval_acc))
        inf={}
        f =  open('/home/tseg/inf.txt', 'w')
        inf["accuracy"] = '0'
        inf["learning_rate"] = '0'
        inf["loss"] = '0'
        f.write(json.dumps(inf))
        f.close()


train()