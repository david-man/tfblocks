import keras
import numpy as np

print(keras.layers.Flatten()(np.random.random(size = (3,4,5,6))).shape)