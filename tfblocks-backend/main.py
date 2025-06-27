from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data_parsing import parse_json
from model_runner import build_model
import keras

app = Flask(__name__)
cors = CORS(app, origins= "*")  # Enable CORS for all routes

@app.route('/api/data/', methods = ["POST"])
@cross_origin()
def receive_data():
    
    data = request.get_json()
    print(data)
    input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map = parse_json(data)
    build_model(input_shape, networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, property_map, dependency_map)
    
    return jsonify({'message': f'Packets Successfully Received'}), 200

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug = True)