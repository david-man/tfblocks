from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from data_parsing import parse_json
from model_runner import build_model
import io
import numpy as np
import os
import shutil
import sys
import os
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"
headers = {
    "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
}

app = Flask(__name__)
cors = CORS(app, origins= ["http://localhost:5173", "https://tfblocks.vercel.app"])  # Enable CORS for selected routes
def get_folder(instance_id):
    current_directory = os.getcwd()
    folder_path = current_directory + f'/{instance_id}/'
    if(not os.path.exists(folder_path)):
        os.mkdir(folder_path)
    return folder_path
def erase_folder(instance_id):
    current_directory = os.getcwd()
    folder_path = current_directory + f'/{instance_id}/'
    if(os.path.exists(folder_path)):
        shutil.rmtree(folder_path)

@app.route('/api/help/', methods = ['POST'])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def getHelp():
    data = request.get_json()
    question = data['question']
    candidate_keyword_mappings = {'dense layers': 'dense', 
                                'convolutional layers': 'conv', 
                                'activation functions' : 'activation', 
                                'pooling layers': 'pooling',
                                'normalization layers': 'norm', 
                                'dropout layers' : 'dropout', 
                                'element-wise addition' : 'add', 
                                'element-wise subtraction' : 'subtract',
                                'dot product operation' : 'dot_product', 
                                'element-wise multiplication' : 'multiply', 
                                'element-wise division' : 'divide', 
                                'matrix slice operations' : 'cut',
                                'concatenate operations': 'concatenate', 
                                'upscale layers' : 'upscale', 
                                'flatten layers': 'flatten', 
                                'reshape layers': 'reshape', 
                                'scalar operations': 'scalar_ops', 
                                'custom matrices': 'custom_matrix',
                                'recurrence': 'recurrent-general', 
                                'simple RNN layers': 'rnn', 
                                'LSTM layers': 'lstm', 
                                'GRU layers': 'gru', 
                                'inputs': 'input_layer', 
                                'outputs': 'output_layer', 
                                'custom recurrent layers': 'recurrent_head',
                                'multi-head attention layers': 'attention'}
    
    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = query({
        "inputs": question,
        "parameters": {"candidate_labels": list(candidate_keyword_mappings.keys()),
                       "hypothesis_template": "this text is related to {}"},
    })
    best_results = []
    for keyword, score in zip(output['labels'], output['scores']):
        if(score > 0.1):
            best_results.append(candidate_keyword_mappings[keyword])
    return jsonify({'best_results': best_results}), 200

@app.route('/api/ping/', methods = ["GET"])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def ping():
    return jsonify({'message': 'awake'}), 200

@app.route('/api/sendModel/', methods = ["POST"])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def receive_data():
    data = request.get_json()
    instance_id = data['instance_id']
    input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map = parse_json(data)
    try:
        model, model_result = build_model(instance_id, input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map)
        folder_path = get_folder(instance_id)
        model.save(folder_path + "/newest_model.keras")
        return send_file(folder_path + "/newest_model.keras", as_attachment=True, download_name='model.keras'), 200
    except Exception as e:
        erase_folder(instance_id)
        print("ERROR:", e)
        return jsonify({'message': f"Model compilation failed. Sorry!"}), 400
@app.route('/api/getMatrixShape/', methods = ['POST'])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def getInputShape():
    data = request.files['input_file']
    try:
        data_bytes = io.BytesIO(data.read())
        loaded_array = np.load(data_bytes)
        return jsonify({'data_shape': loaded_array.shape}), 200
    except:
        return jsonify({'message': 'input invalid'}), 400

@app.route('/api/sendMatrices/', methods = ["POST"])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def receive_matrices():
    data_id = request.form.get('save_as')
    instance_id = request.form.get('instance_id')
    data = request.files['matrix']
    try:
        data_bytes = io.BytesIO(data.read())
        loaded_array = np.load(data_bytes)
        folder_path = get_folder(instance_id)
        np.save(folder_path + f'/{data_id}.npy', loaded_array)
        return jsonify({'message' : 'matrix saved'}), 200
    except:
        return jsonify({'message': 'input invalid'}), 400

@app.route('/api/release_data/', methods = ['POST'])
@cross_origin(origins = ["http://localhost:5173", "https://tfblocks.vercel.app"])
def release_data():
    try:
        instance_id = request.get_json()['instance_id']
        erase_folder(instance_id)
        return jsonify({}), 200
    except:
        return jsonify({}), 400
    
if __name__ == '__main__':
    port = int(os.getenv('PORT', 4000))
    if(len(sys.argv) > 1):
        if(sys.argv[1] == '--dev'):
            app.run(host='localhost', port=8000, debug=False)
        else:
            app.run(host='0.0.0.0', port=port, debug=False)
    else:
        app.run(host='0.0.0.0', port=port, debug=False)
