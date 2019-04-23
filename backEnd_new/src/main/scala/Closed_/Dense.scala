import com.intel.analytics.bigdl.nn.BCECriterion
import com.intel.analytics.bigdl.tensor.Tensor

val outputdim = %d
val active = "%s"

model.add(Dense(outputdim, activation = active))

val criterion = BCECriterion[Float]()
model.compile(optimizer="adam", criterion, null)
//model.fit(Xtrain,ytrain,batch_size=32,epochs=10,validation_data=(Xtest,ytest))