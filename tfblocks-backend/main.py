from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data_parsing import parse_json
from model_runner import build_model
import io
import numpy as np
app = Flask(__name__)
cors = CORS(app, origins= "*")  # Enable CORS for all routes
current_progress = 0
@app.route('/api/sendModel/', methods = ["POST"])
@cross_origin()
def receive_data():
    data = request.get_json()
    input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map = parse_json(data)
    model, model_result = build_model(input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map)
    if(not model_result):
        if(model == 'NO MODEL'):
            return jsonify({'message': f"You have no model. Sorry!"}), 400
        else:
            return jsonify({'message': f"Something went wrong!"}), 400
    else:
        try:
            inputs = np.load('input.npy')
            outputs = np.load('output.npy')
            inputs = np.reshape(inputs, (1, ) + inputs.shape)
            outputs = np.reshape(outputs, (1, ) + outputs.shape)

            model.compile(optimizer = 'adam', loss = 'mse', metrics = ['mse'])
            model.fit(inputs, outputs, epochs = 10)

            return jsonify({'message': f"Model trained!"}), 200
        except:
            return jsonify({'message': f'You didn\'t give us an input or output file!'}), 200

@app.route('/api/setInputData/', methods = ['POST'])
@cross_origin()
def validateInputData():
    data = request.files['input_file']
    try:
        data_bytes = io.BytesIO(data.read())
        loaded_array = np.load(data_bytes)
        np.save('input.npy', loaded_array)
        return jsonify({'input_data_shape': loaded_array.shape}), 200
    except:
        return jsonify({'message': 'input invalid'}), 400
    
@app.route('/api/setOutputData/', methods = ['POST'])
@cross_origin()
def validateOutputData():
    data = request.files['output_file']
    try:
        data_bytes = io.BytesIO(data.read())
        loaded_array = np.load(data_bytes)
        np.save('output.npy', loaded_array)
        return jsonify({'output_data_shape': loaded_array.shape}), 200
    except:
        return jsonify({'message': 'input invalid'}), 400
        

@app.route('/api/progressStatus/', methods = ['GET'])
@cross_origin()
def send_data():
    global current_progress
    current_progress += 1
    return jsonify({'progress': current_progress}), 200

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug = True)