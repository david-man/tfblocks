from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from data_parsing import parse_json
from model_runner import build_model
import io
import numpy as np
import os
app = Flask(__name__)
cors = CORS(app, origins= "*")  # Enable CORS for all routes
current_progress = 0
@app.route('/api/sendModel/', methods = ["POST"])
@cross_origin()
def receive_data():
    data = request.get_json()
    input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map = parse_json(data)
    try:
        model, model_result = build_model(input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map)
        model.save('newest_model.keras')
        return jsonify({'message': f"Model compilation succeeded!"}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': f"Model compilation failed. Sorry!"}), 400

@app.route('/api/getLastModel/', methods = ["GET"])
@cross_origin()
def send_model():
    current_directory = os.getcwd()
    file_path = os.path.join(current_directory, "newest_model.keras")
    if(os.path.exists(file_path)):
        return send_file(file_path, as_attachment=True, download_name='model.keras')
    else:
        return {}, 400
    

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