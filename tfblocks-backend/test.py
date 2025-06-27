import keras
import tensorflow as tf
import numpy as np

class MinimalRNNCell(keras.Layer):

    def __init__(self, input_shape):
        super().__init__()
        self.input_size = input_shape
        self.state_size = input_shape
        self.dense_layer = keras.layers.Dense(3)
    def call(self, inputs, states):
        prev_output = states[0]
        h = inputs + prev_output
        h = self.dense_layer(h)
        return h, [h]

mycell = MinimalRNNCell(3)
test = keras.layers.RNN(cell = mycell)
mycell(tf.random.uniform(shape = (1, 3)), [tf.random.uniform(shape = (1, 3))])
model = keras.Sequential([keras.layers.Input(shape = (10, 3)), test])
model(tf.random.uniform(shape = (1, 10, 3)))
x = tf.random.uniform(shape = (1, 10, 3))
model.summary()