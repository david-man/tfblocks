import keras
import tensorflow as tf
import numpy as np

model = keras.models.load_model('newest_model.keras')
model.save('model.h5')