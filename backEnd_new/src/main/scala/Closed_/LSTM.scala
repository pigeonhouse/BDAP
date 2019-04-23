val outdim = %d
val p = %f

model.add(LSTM(outdim))
model.add(Dropout(p))