'''
Python file that shows how you can bring up a custom model.

Note that if you have a Custom Recurrent head in your network, you will need to add the following line to your code

from CustomRNNCell import CustomRNNCell
'''
import keras
model = keras.models.load_model("[].keras")#put the path of your model in here
model.summary()