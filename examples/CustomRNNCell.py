'''
This class is a duplicate of the class found in tfblocks-backend. It needs to be imported if you want to use any custom RNN head.
'''

import keras 
import numpy as np
import os
import tensorflow as tf
@keras.saving.register_keras_serializable()
class CustomRNNCell(keras.layers.Layer):
    def __init__(self, instance_id = None, input_shape = None, state_shape = None,
                 layer_dict=None, properties_map = None, 
                 rec_node_id = None, run_order = None, 
                 RNNs = None, type_map = None, 
                 input_handle_dict= None, output_handle_dict= None, **kwargs):
        super().__init__(**kwargs)
        self.instance_id = instance_id
        self.input_shape = input_shape
        self.state_size = state_shape
        self.output_size = state_shape
        self.run_order = run_order
        self.rec_node_id = rec_node_id
        self.raw_id = self.rec_node_id.replace("rec_hidden_", "")
        self.RNNs = RNNs
        self.type_map = type_map
        self.cell_layers = []#layers actually inside the cell
        self.layer_dict= layer_dict#dictionary of all nodes to layers
        self.input_handle_dict= input_handle_dict
        self.output_handle_dict = output_handle_dict
        self.properties_map = properties_map
        for node in self.run_order:
            if(node != rec_node_id and node in layer_dict):
                self.cell_layers.append((node, layer_dict[node]))#forces Keras to acknowledge the existence of the inner layers
    def run_node(self, handle_results, node_id):
        if(node_id == 'in'):
            output_handle = 'in|output_handle'
            handle_results[output_handle] = self.layers[node_id]
        elif('rec_external_' in node_id):
            raw_id = node_id.replace("rec_external_", "")
            network_id = f"rec_hidden_{raw_id}"
            layer = self.RNNs[network_id]
            input_handle = self.properties_map[raw_id]['external_parent_handle_id']
            output_handle = self.properties_map[raw_id]['external_output_handle_id']
            seq2seq = self.properties_map[raw_id]['seq2seq']
            if(seq2seq):
                handle_results[output_handle], _ = layer(handle_results[input_handle])
            else:
                handle_results[output_handle] = layer(handle_results[input_handle])
            return
        elif(node_id == 'out'):
            input_handle = self.input_handle_dict['out'][0]
            handle_results['final_result'] = handle_results[input_handle]
        else:
            match self.type_map[node_id]:
                case 'add':
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = handle_results[input_handle_1] + handle_results[input_handle_2]
                case 'subtract':
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = handle_results[input_handle_1] - handle_results[input_handle_2]
                case 'multiply':
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = keras.ops.multiply(handle_results[input_handle_1], handle_results[input_handle_2])
                case 'divide':
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = keras.ops.divide(handle_results[input_handle_1], handle_results[input_handle_2])
                case 'attention':
                    input_handle_q = self.input_handle_dict[node_id][0]
                    input_handle_kv = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = self.layer_dict[node_id](handle_results[input_handle_q], 
                                                                    handle_results[input_handle_kv], 
                                                                    handle_results[input_handle_kv])
                case 'custom_matrix':
                    file_id = self.properties_map[node_id]['file_id']
                    folder_path = os.getcwd() + f'/{self.instance_id}'
                    np_array = np.load(folder_path + f'/{file_id}.npy')
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = tf.constant(np_array)
                case 'scalar_ops':
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    scalar = self.properties_map[node_id]['scalar']
                    operation = self.properties_map[node_id]['operation']
                    match operation:
                        case 'add':
                            handle_results[output_handle] = handle_results[input_handle] + scalar
                        case 'multiply':
                            handle_results[output_handle] = handle_results[input_handle] * scalar
                        case 'exponentiate':
                            handle_results[output_handle] = handle_results[input_handle] ** scalar
                        case _:
                            raise Exception("ScalarOps Error!")
                case 'concatenate':
                    axis = self.properties_map[node_id]['axis']
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = keras.ops.concatenate(xs = [handle_results[input_handle_1], handle_results[input_handle_2]], axis = axis)
                case 'cut':
                    axis = self.properties_map[node_id]['axis']
                    cut_1 = self.properties_map[node_id]['cut_1']
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle_1 = self.output_handle_dict[node_id][0]
                    output_handle_2 = self.output_handle_dict[node_id][1]
                    handle_results[output_handle_1], handle_results[output_handle_2] = keras.ops.split(handle_results[input_handle], [cut_1], axis = axis)
                case 'dot_product':
                    input_handle_1 = self.input_handle_dict[node_id][0]
                    input_handle_2 = self.input_handle_dict[node_id][1]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = keras.ops.dot(handle_results[input_handle_1], handle_results[input_handle_2])
                case 'reshape':
                    output_shape = self.properties_map[node_id]['output_shape']
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = keras.ops.reshape(handle_results[input_handle], output_shape)
                case 'RNN':
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    seq2seq = self.properties_map[node_id]['seq2seq']
                    if(seq2seq):
                        handle_results[output_handle], _ = self.layer_dict[node_id](handle_results[input_handle])
                    else:
                        handle_results[output_handle] = self.layer_dict[node_id](handle_results[input_handle])
                case 'LSTM':
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    seq2seq = self.properties_map[node_id]['seq2seq']
                    if(seq2seq):
                        handle_results[output_handle], _ = self.layer_dict[node_id](handle_results[input_handle])
                    else:
                        handle_results[output_handle] = self.layer_dict[node_id](handle_results[input_handle])
                case 'GRU':
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    seq2seq = self.properties_map[node_id]['seq2seq']
                    if(seq2seq):
                        handle_results[output_handle], _ = self.layer_dict[node_id](handle_results[input_handle])
                    else:
                        handle_results[output_handle] = self.layer_dict[node_id](handle_results[input_handle])
                case _:
                    input_handle = self.input_handle_dict[node_id][0]
                    output_handle = self.output_handle_dict[node_id][0]
                    handle_results[output_handle] = self.layer_dict[node_id](handle_results[input_handle])
    def call(self, inputs, states):
        handle_results = {}
        handle_results[f'{self.rec_node_id}|timestep_handle'] = inputs
        handle_results[f'{self.rec_node_id}|output_handle'] = states[0]
        for node in self.run_order:
            if(node == self.rec_node_id):
                continue
            else:
                self.run_node(handle_results, node)
        final_handle = self.properties_map[self.raw_id]['hidden_parent_handle_id']
        return handle_results[final_handle], [handle_results[final_handle]]
    def build(self, input_shape):
        super().build(input_shape)
        for id, layer in self.cell_layers:
            if(self.type_map[id] == 'attention'):
                input_shape_q = tuple([None] + self.properties_map[id]['input_shape_q'])
                input_shape_kv = tuple([None] + self.properties_map[id]['input_shape_kv'])
                layer.build(query_shape=input_shape_q, value_shape=input_shape_kv, key_shape=input_shape_kv)
            elif(hasattr(layer, 'build')):
                input_shape = tuple([None] + self.properties_map[id]['input_shape'])
                layer.build(input_shape)
    def get_config(self):
        config = super().get_config()
        serialized_layers = {}
        for id, layer in self.layer_dict.items():
            if(id in self.run_order):
                serialized_layers[id] = {
                    'class_name': layer.__class__.__name__,
                    'config': layer.get_config()
                }
        serialized_RNNs = {}
        for id, layer in self.RNNs.items():
            serialized_RNNs[id] = {
                'class_name': layer.__class__.__name__,
                'config': layer.get_config()
            }
        
        config.update({
            "instance_id": self.instance_id, 
            'input_shape': self.input_shape,
            'state_shape': self.state_size,
            'layer_dict':  serialized_layers,
            'properties_map': self.properties_map,
            'rec_node_id':self.rec_node_id,
            'run_order':self.run_order,
            'RNNs':serialized_RNNs,
            'type_map':self.type_map,
            'input_handle_dict': self.input_handle_dict,
            'output_handle_dict':self.output_handle_dict
        })
        return config
    @classmethod
    def from_config(cls, config):
        # Deserialize layer_dict by reconstructing layers from their configs
        layer_dict = {}
        for id, layer_config in config.get("layer_dict", {}).items():
            # Get the layer class from keras.layers
            layer_class = getattr(keras.layers, layer_config['class_name'])
            # Reconstruct the layer
            layer_dict[id] = layer_class.from_config(layer_config['config'])
        # Deserialize RNNs by reconstructing them from configs
        RNNs = {}
        for id, layer_config in config.get("RNNs", {}).items():
            # Get the layer class from keras.layers
            layer_class = getattr(keras.layers, layer_config['class_name'])
            # Reconstruct the layer
            RNNs[id] = layer_class.from_config(layer_config['config'])
        
        # Create instance with reconstructed layers and properties_map
        return cls(instance_id = config['instance_id'], 
                input_shape = config['input_shape'], 
                state_shape = config['state_shape'],
                layer_dict=layer_dict, 
                properties_map = config['properties_map'], 
                rec_node_id = config['rec_node_id'], 
                run_order = config['run_order'], 
                RNNs = RNNs, 
                type_map = config['type_map'], 
                input_handle_dict= config['input_handle_dict'], 
                output_handle_dict= config['output_handle_dict'])